import cors from "cors";
import express from "express";
import swaggerUi from "swagger-ui-express";
import { router as apiRouter } from "./routes/index.router.js";
import { config } from "../config.ts";
import { globalErrorHandler } from "./middlewares/global-error-handler.ts";
import { notFoundMiddleware } from "./middlewares/not-found.middleware.ts";
import { helmetMiddleware } from "./middlewares/helmet.middleware.ts";
import { xssSanitizerMiddleware } from "./middlewares/xss-sanitizer.middleware.ts";
import { swaggerSpec } from "./lib/swagger.ts";
import { logRequest } from "./middlewares/log-request.middleware.ts";

// Créer une app Express
export const app = express();

// Sécuriser les headers HTTP
app.use(helmetMiddleware);

// Autoriser les requêtes cross-origin
app.use(cors({ origin: config.allowedOrigins }));

// Body parser pour récupérer les body "application/json" dans req.body
app.use(express.json());

// Nettoyer les chaînes du body pour prévenir les injections XSS
app.use(xssSanitizerMiddleware);

// logger des requêtes HTTP
app.use(logRequest);

// Documentation Swagger (interface web)
app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Brancher le routeur de l'API
app.use("/api", apiRouter);

// Intercepter favicon
app.get("/favicon.ico", (req, res) => {
  res.status(204).end(); // No Content
});

// Not found middleware
app.use(notFoundMiddleware);

// Global error middleware
app.use(globalErrorHandler);