// Navigation principale. `children` = sous-menu (Solutions).
export default {
  main: [
    { label: "Fonctionnalités", url: "/fonctionnalites/" },
    {
      label: "Solutions",
      id: "solutions",
      match: "/solutions/",
      children: [
        { label: "Installateurs IRVE", url: "/solutions/installateurs-irve/" },
        { label: "Installateurs photovoltaïques", url: "/solutions/installateurs-photovoltaiques/" },
      ],
    },
    { label: "Tarifs", url: "/tarifs/" },
    { label: "Contact", url: "/contact/" },
  ],
  footer: {
    produit: [
      { label: "Fonctionnalités", url: "/fonctionnalites/" },
      { label: "Tarifs", url: "/tarifs/" },
      { label: "Demander une démo", url: "/demo/" },
    ],
    solutions: [
      { label: "Installateurs IRVE", url: "/solutions/installateurs-irve/" },
      { label: "Installateurs photovoltaïques", url: "/solutions/installateurs-photovoltaiques/" },
    ],
    legal: [
      { label: "Contact", url: "/contact/" },
      { label: "Mentions légales", url: "/mentions-legales/" },
      { label: "Confidentialité", url: "/confidentialite/" },
    ],
  },
};
