import argon2 from "argon2";
import type { Request, Response } from "express";
import { prisma } from "../models/index.ts";
import type { User } from "../models/index.ts";
import z from "zod";
import { ConflictError, UnauthorizedError } from "../lib/errors.ts";
import { generateAuthTokens, setAccessTokenCookie, setRefreshTokenCookie, type Token } from "../lib/tokens.ts";

export async function registerUser(req: Request, res: Response) {
    const registerUserBodySchema = z
        .object({
        firstname: z.string().min(2),
        lastname: z.string().min(2),
        email: z.email(),
        password: z
            .string()
            .min(12)
            .max(100)
            .regex(/[a-z]/, "Password must contain at least one lowercase caracter")
            .regex(/[A-Z]/, "Password must contain at least one uppercase caracter")
            .regex(/[0-9]/, "Password must contain at least one number"),
        confirm: z.string(),
        })
        // https://v3.zod.dev/?id=refine
        .refine(data => data.password === data.confirm, {
        message: "Passwords don't match",
        path: ["confirm"], // l'erreur sera attachée à ce champ
        });

    const { firstname, lastname, email, password } =
        await registerUserBodySchema.parseAsync(req.body);

    const existingUser = await prisma.user.findFirst({ where: { email } });
    if (existingUser) {
        throw new ConflictError("Email already used");
    }

    const passwordHash = await argon2.hash(password);

    const user = await prisma.user.create({
        data: {
        firstname,
        lastname,
        email,
        password: passwordHash,
        },
    });

    res.status(201).json({
        id: user.id,
        firstname: user.firstname,
        lastname: user.lastname,
        email: user.email,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
    });
}

export async function loginUser(req: Request, res: Response) {
    const loginUserBodySchema = z.object({
        email: z.email(),
        password: z.string(),
    });

    const { email, password } = await loginUserBodySchema.parseAsync(req.body);

    const user = await prisma.user.findFirst({ where: { email } });

    if (!user) {
        throw new UnauthorizedError("Email and password do not match");
    }

    const isMatching = await argon2.verify(user.password, password);

    if (!isMatching) {
        throw new UnauthorizedError("Email and password do not match");
    }

    const { accessToken, refreshToken } = generateAuthTokens(user);

    // stocker/remplacer le token de refresh en db
    await replaceRefreshTokenInDatabase(refreshToken, user);
    // ajouter les headers pour définition des cookies
    setAccessTokenCookie(res, accessToken);
    setRefreshTokenCookie(res, refreshToken);
    // renvoyer la réponse au client
    res.json({ accessToken, refreshToken });
}

export async function logoutUser(req: Request, res: Response) {
    await prisma.refreshToken.deleteMany({ where: { userId: req.user.id } });
    res.clearCookie("accessToken");
    res.clearCookie("refreshToken", { path: "/api/auth/refresh" });
    res.status(204).end();
}

export async function getAuthenticatedUser(req: Request, res: Response) {
    const user = await prisma.user.findUnique({
        where: { id: req.user.id },
        omit: { password: true },
    });

    if (!user)
        throw new UnauthorizedError("Token payload doesn't match any user");

    res.json(user);
}

export async function refreshTokens(req: Request, res: Response) {
    const token = req.cookies?.refreshToken || req.body?.refreshToken;

    if (!token) throw new UnauthorizedError("Refresh token not provided");
    // au choix, on peut récupérer l'id du propriétaire du token dans le payload ou dans la db
    const existingToken = await prisma.refreshToken.findFirst({
        where: { token },
        include: { user: true },
    });
    if (!existingToken) throw new UnauthorizedError("Invalid Refresh token");

    if (existingToken.expiresAt < new Date()) {
        await prisma.refreshToken.delete({ where: { id: existingToken.id } });
        throw new UnauthorizedError("Invalid Refresh token");
    }
    const { accessToken, refreshToken } = generateAuthTokens(existingToken.user);
    await replaceRefreshTokenInDatabase(refreshToken, existingToken.user);
    setAccessTokenCookie(res, accessToken);
    setRefreshTokenCookie(res, refreshToken);
    res.json({ accessToken, refreshToken });
}

async function replaceRefreshTokenInDatabase(refreshToken: Token, user: User) {
    //effacer tous les refresh tokens de cet utilisateur
    await prisma.refreshToken.deleteMany({ where: { userId: user.id } });
    //ajouter le nouveau token de l'utilisateur
    await prisma.refreshToken.create({
        data: {
        token: refreshToken.token,
        userId: user.id,
        issuedAt: new Date(),
        expiresAt: new Date(new Date().valueOf() + refreshToken.expiresInMS),
        },
    });
}