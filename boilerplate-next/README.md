# Boilerplate Next.js "Production Ready"

Ce projet est un boilerplate Next.js conçu pour être "production ready", intégrant les meilleures pratiques et une stack technologique moderne.

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT) <!-- Exemple de badge -->

## ✨ Fonctionnalités Principales

- **Framework Full-Stack**: [Next.js](https://nextjs.org/) (App Router)
- **Langage**: [TypeScript](https://www.typescriptlang.org/)
- **Base de Données**: [PostgreSQL](https://www.postgresql.org/) (via Docker)
- **ORM**: [Prisma](https://www.prisma.io/)
- **Authentification**: [NextAuth.js](https://next-auth.js.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) (avec thèmes multiples pré-configurés)
- **Internationalisation (i18n)**: [next-intl](https://next-intl-docs.vercel.app/) (routage basé sur la locale, fichiers JSON)
- **Gestion des Formulaires**: [React Hook Form](https://react-hook-form.com/) & [Zod](https://zod.dev/) (pour la validation)
- **Server Actions**: Pour une logique backend moderne et intégrée.
- **Tests**:
  - Unitaires/Composants: [Vitest](https://vitest.dev/) & [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/)
  - End-to-End (E2E): [Playwright](https://playwright.dev/) (avec configuration Docker dédiée)
- **Linting & Formatting**: [ESLint](https://eslint.org/) (avec la nouvelle "flat config") et Prettier (implicitement via les standards Next.js)
- **Containerisation**: [Docker](https://www.docker.com/) & Docker Compose pour les environnements de développement et de production.
- **Gestionnaire de Paquets**: [pnpm](https://pnpm.io/)

## 🚀 Démarrage Rapide

Suivez ces étapes pour mettre en place et lancer le projet localement.

### Prérequis

- [Node.js](https://nodejs.org/) (version 18.x ou supérieure recommandée)
- [pnpm](https://pnpm.io/installation)
- [Docker](https://www.docker.com/get-started/) et Docker Compose

### Étapes d'installation

1.  **Cloner le dépôt** (si ce n'est pas déjà fait) :

    ```bash
    git clone <URL_DU_DEPOT_GIT>
    cd boilerplate-next
    ```

2.  **Copier les variables d'environnement** :
    Créez un fichier `.env` à la racine du projet en copiant `.env.example` (si vous en créez un, sinon listez les variables nécessaires ici) :

    ```bash
    cp .env.example .env # Si .env.example existe
    ```

    Assurez-vous de configurer les variables nécessaires, notamment `DATABASE_URL` (qui est généralement gérée par Docker Compose mais peut être surchargée) et les secrets pour `NextAuth.js`.

    Exemple de `DATABASE_URL` pour Docker (généralement dans `.env` ou directement dans `docker-compose.yml`) :
    `DATABASE_URL="postgresql://user:password@postgres:5432/mydb?schema=public"`

3.  **Installer les dépendances** (si vous souhaitez les avoir localement en plus de Docker, sinon cette étape est gérée dans l'image Docker) :

    ```bash
    pnpm install
    ```

4.  **Lancer les services avec Docker Compose** :
    Cette commande va construire les images (si nécessaire) et démarrer les conteneurs (application Next.js, base de données PostgreSQL, service Playwright).

    ```bash
    docker compose up -d --build
    ```

5.  **Exécuter les migrations Prisma** :
    Une fois que le conteneur PostgreSQL est prêt, exécutez les migrations pour créer le schéma de base de données. Cela doit être fait _à l'intérieur_ du conteneur de l'application Next.js.

    ```bash
    docker compose exec nextjs pnpm prisma migrate dev
    ```

    Si vous avez déjà fait un `migrate deploy` dans votre script `start`, vous pourriez aussi avoir besoin de `prisma generate` si des changements ont été faits au schéma :

    ```bash
    docker compose exec nextjs pnpm prisma generate
    ```

6.  **Accéder à l'application** :
    Ouvrez votre navigateur et allez sur [http://localhost:3000](http://localhost:3000).

### Autres commandes utiles

- **Arrêter les services Docker** :
  ```bash
  docker compose down
  ```
- **Voir les logs d'un service (ex: nextjs)** :
  ```bash
  docker compose logs -f nextjs
  ```
- **Lancer les tests unitaires/composants** :
  Exécutez cela dans le conteneur `nextjs` ou localement si les dépendances sont installées.
  ```bash
  docker compose exec nextjs pnpm test
  # ou localement
  # pnpm test
  ```
- **Lancer les tests E2E Playwright** :
  ```bash
  docker compose exec playwright pnpm test:e2e
  ```
- **Voir le rapport des tests E2E** (après exécution des tests) :
  Assurez-vous que le port 9323 est mappé dans `docker-compose.yml` pour le service `playwright`.

  ```bash
  docker compose exec playwright pnpm test:e2e:report
  ```

  Puis accédez à [http://localhost:9323](http://localhost:9323).

- **Accéder à Prisma Studio** (pour visualiser/gérer votre base de données) :
  Assurez-vous que le port 5555 est mappé dans `docker-compose.yml` pour le service `nextjs` et que le script pour lancer Prisma Studio est disponible.
  Si vous avez un script comme `prisma:studio`: `prisma studio --port 5555` dans `package.json`:

  ```bash
  docker compose exec nextjs pnpm prisma:studio # Adaptez si le script a un autre nom
  ```

  Puis accédez à [http://localhost:5555](http://localhost:5555).

- **Linting** :
  ```bash
  docker compose exec nextjs pnpm lint
  # ou localement
  # pnpm lint
  ```

## 📁 Structure des Dossiers Clés

- `messages/`: Fichiers de traduction JSON pour `next-intl`.
- `prisma/`: Schéma (`schema.prisma`) et migrations de la base de données.
- `public/`: Assets statiques.
- `scripts/`: Scripts utilitaires pour le projet.
- `src/`: Code source de l'application.
  - `actions/`: Server Actions de Next.js.
  - `app/[locale]/`: Pages et layouts de l'App Router, structurés pour l'i18n.
  - `components/`: Composants React (UI, formulaires, providers, etc.).
  - `hooks/`: Hooks React personnalisés.
  - `i18n/`: Configuration de `next-intl` (`routing.ts`, `request.ts`).
  - `lib/`: Utilitaires partagés (ex: instance Prisma, schémas Zod).
  - `middleware.ts`: Middleware Next.js (utilisé ici pour `next-intl`).
  - `types/`: Définitions de types TypeScript personnalisées.
- `tests/`: Tests End-to-End Playwright.

## 🤝 Contribution

Les contributions sont les bienvenues ! Veuillez lire les directives de contribution (si vous en créez) avant de soumettre une Pull Request.

## 📜 Licence

Ce projet est sous licence MIT - voir le fichier [LICENSE](LICENSE.md) (à créer si vous le souhaitez) pour plus de détails.

---

_Ce README a été amélioré avec l'aide de Gemini._
