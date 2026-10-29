// FAQ par page. Même source pour le HTML visible (partials/faq.njk) et le JSON-LD FAQPage.
// Réponses en texte brut. [À COMPLÉTER] : informations à fournir par le client.
const ph = (t) => `[À COMPLÉTER : ${t}]`;

// Typographie française : espace insécable (U+00A0) avant : ; ! ? et à l'intérieur des guillemets « ».
const fr = (s) => s.replace(/ ([:;!?»])/g, " $1").replace(/« /g, "« ");

const data = {
  home: [
    {
      q: "À qui s’adresse Kible ?",
      a: "Kible s’adresse aux installateurs de bornes de recharge IRVE et de panneaux solaires photovoltaïques : dirigeants et managers qui veulent piloter leur activité commerciale, et commerciaux terrain qui prospectent, font du porte-à-porte et prennent des rendez-vous.",
    },
    {
      q: "Comment fonctionne la prospection sur la carte ?",
      a: "Vos prospects sont affichés sur une carte. Vous définissez des secteurs et des zones, vous les attribuez à vos commerciaux et vous organisez les tournées de porte-à-porte pour éviter les chevauchements et les trajets inutiles.",
    },
    {
      q: "Puis-je suivre l’activité de mon équipe ?",
      a: "Oui. Les tableaux de bord réunissent les visites, les opportunités et les objectifs, pour que vous puissiez piloter l’activité de chaque commercial et de l’équipe sans attendre un reporting manuel.",
    },
    {
      q: "Comment Kible aide-t-il mes commerciaux à progresser ?",
      a: "Kible propose un suivi individuel, des objectifs et des éléments de motivation comme le classement d’équipe. Les managers disposent ainsi de repères factuels pour coacher chacun.",
    },
    {
      q: "Kible remplace-t-il mes outils de devis ou de gestion de chantier ?",
      a: "Non. Kible se concentre sur la prospection terrain, le suivi d’activité et le coaching. Il ne remplace ni vos outils de chiffrage ni votre gestion de chantier.",
    },
    {
      q: "Peut-on prospecter à la fois des particuliers et des professionnels ?",
      a: "Les installateurs IRVE et photovoltaïques s’adressent souvent aux deux publics. Kible aide à organiser secteurs, visites et rendez-vous, quel que soit le profil du prospect. " + ph("préciser la gestion des types de prospects dans le produit"),
    },
    {
      q: "Comment démarrer avec Kible ?",
      a: "Demandez une démo : nous échangeons sur votre activité et nous vous présentons Kible. Vous pouvez aussi vous rendre sur app.kible.fr pour créer votre compte. " + ph("délai de mise en route"),
    },
  ],
  irve: [
    {
      q: "Kible convient-il aux installateurs de bornes de recharge ?",
      a: "Oui. Kible est conçu pour les équipes terrain des installateurs IRVE : il aide à repérer les secteurs à visiter, à organiser le porte-à-porte, à suivre les rendez-vous et à coacher les commerciaux.",
    },
    {
      q: "Comment organiser le porte-à-porte pour des bornes de recharge ?",
      a: "Placez vos prospects sur la carte, découpez le territoire en secteurs (quartiers résidentiels, résidences, zones d’activité) et attribuez-les à vos commerciaux. Chacun prépare sa tournée sans empiéter sur celle des autres.",
    },
    {
      q: "Peut-on suivre les opportunités entre particuliers et professionnels ?",
      a: "Kible permet de suivre les visites et les opportunités de toute l’équipe, que vos commerciaux visitent des maisons, des copropriétés ou des entreprises avec flotte de véhicules. " + ph("confirmer comment le produit distingue particuliers et professionnels"),
    },
    {
      q: "Kible gère-t-il les dossiers de prime Advenir ou les études techniques ?",
      a: "Non. Kible intervient en amont : il organise la prospection, le suivi d’activité et le coaching. Le chiffrage, les dossiers d’aides et les aspects techniques restent gérés dans vos outils habituels.",
    },
    {
      q: "Comment démarrer ?",
      a: "Demandez une démo pour voir Kible appliqué à votre activité de bornes de recharge, ou rendez-vous sur app.kible.fr pour créer votre compte.",
    },
  ],
  photovoltaique: [
    {
      q: "Kible convient-il aux installateurs de panneaux solaires ?",
      a: "Oui. Kible est conçu pour les équipes terrain des installateurs photovoltaïques : il aide à cibler les secteurs, enchaîner les visites, suivre les rendez-vous et faire progresser les commerciaux.",
    },
    {
      q: "Comment organiser les tournées de prospection solaire ?",
      a: "Affichez vos prospects sur la carte, définissez des secteurs (quartiers pavillonnaires, zones d’activité) et répartissez-les entre commerciaux. Chaque tournée est préparée en amont, sans doublon.",
    },
    {
      q: "Comment suivre les rendez-vous et les objectifs de l’équipe ?",
      a: "Les tableaux de bord réunissent visites, opportunités et objectifs. Le dirigeant ou le manager voit où en est chaque commercial et peut ajuster le coaching rapidement.",
    },
    {
      q: "Kible remplace-t-il mon outil de chiffrage ou de simulation solaire ?",
      a: "Non. Kible ne réalise ni devis ni étude de production. Il aide vos équipes à prospecter, suivre leur activité et progresser. Les arguments sur l’autoconsommation ou les aides restent ceux de vos équipes.",
    },
    {
      q: "Comment démarrer ?",
      a: "Demandez une démo pour voir Kible appliqué à votre activité photovoltaïque, ou rendez-vous sur app.kible.fr pour créer votre compte.",
    },
  ],
  tarifs: [
    {
      q: "Comment sont facturées les offres Kible ?",
      a: ph("mode de facturation : par utilisateur, par équipe, mensuel ou annuel, HT ou TTC"),
    },
    {
      q: "Existe-t-il un engagement de durée ?",
      a: ph("conditions d’engagement et de résiliation"),
    },
    {
      q: "Puis-je essayer Kible avant de m’abonner ?",
      a: "Vous pouvez demander une démo pour découvrir Kible avec notre équipe. " + ph("existence et durée éventuelle d’un essai gratuit"),
    },
    {
      q: "Quelle offre choisir pour mon équipe ?",
      a: "Cela dépend de la taille de votre équipe terrain et de vos besoins de pilotage. Lors de la démo, nous faisons le point avec vous pour identifier l’offre adaptée. " + ph("critères de choix entre les offres"),
    },
  ],
};

export default Object.fromEntries(
  Object.entries(data).map(([key, items]) => [key, items.map(({ q, a }) => ({ q: fr(q), a: fr(a) }))]),
);
