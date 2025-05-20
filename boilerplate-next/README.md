This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

docker compose up --build

Open [https://local.boilerplate.com](http://localhost:3000)

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

## Désactivation du site vitrine

Il est possible de désactiver le site vitrine tout en conservant l'accès aux tableaux de bord (admin, client, agent). Cette fonctionnalité est utile pour les clients qui souhaitent uniquement utiliser les fonctionnalités de gestion sans exposer un site public.

### Configuration

Pour désactiver le site vitrine, vous pouvez définir la variable d'environnement `DISABLE_SHOWCASE_SITE` sur `true` :

1. Dans le fichier `.env` :

   ```
   DISABLE_SHOWCASE_SITE="true"
   ```

2. Dans le Dockerfile.prod :

   ```
   ENV DISABLE_SHOWCASE_SITE=true
   ```

3. Lors du démarrage du conteneur :
   ```
   docker run -e DISABLE_SHOWCASE_SITE=true ...
   ```

### Comportement

Lorsque le site vitrine est désactivé :

- Les utilisateurs non connectés seront automatiquement redirigés vers la page de connexion client
- Les utilisateurs connectés auront toujours accès à leurs tableaux de bord respectifs
- Toutes les fonctionnalités de gestion restent disponibles
- **La génération du sitemap est automatiquement désactivée**
- **Un fichier robots.txt restrictif est créé pour empêcher l'indexation du site par les moteurs de recherche**

Pour réactiver le site vitrine, il suffit de définir `DISABLE_SHOWCASE_SITE` sur `false` ou de supprimer cette variable d'environnement.

Playwright

docker compose run --rm playwright test:e2e:report
