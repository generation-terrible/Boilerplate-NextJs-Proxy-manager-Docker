# Boilerplate-Docker-Next Project Tasks

Ce document suit l'avancement du développement et les améliorations prévues pour le projet Boilerplate-Docker-Next, visant à fournir une base solide et générique pour démarrer rapidement de nouvelles applications.

## Completed Tasks

- [x] **Initialisation du projet Next.js** avec TypeScript et Tailwind CSS.
- [x] **Configuration de Docker** pour le développement et la production (`Dockerfile`, `docker-compose.yml`).
- [x] **Mise en place de l'internationalisation (i18n)** avec `next-intl`.
- [x] **Intégration de l'authentification** avec NextAuth.js (modèles Prisma `User`, `Account`, `Session`, pages de login/register).
- [x] **Mise en place d'un `ThemeProvider`** et d'un `ThemeSwitcher`.
- [x] **Ajout de composants UI de base** (`shadcn/ui`: Button, DropdownMenu, Sheet).
- [x] **Création de la structure de base des pages** (Accueil, Dashboard protégé).
- [x] **Application initiale des Cursor Rules** (clean-code, nextjs, tailwind).
- [x] **Ajout des traductions pour les pages d'erreur et de chargement**.
- [x] **Suppression de la fonctionnalité de gestion des tâches** pour un boilerplate plus générique (modèle Prisma, actions, schémas, composants, traductions).

## In Progress Tasks

- [ ] **Affiner les règles Cursor et leur application** : Revoir si d'autres modifications sont pertinentes pour "clean-code", "nextjs", "tailwind", "typescript".
- [ ] **Finaliser la configuration et l'exécution des commandes Prisma dans Docker**.

## Future Tasks

### Améliorations du Boilerplate

- [ ] **Exemples de Pages et Composants Génériques**:
  - [ ] Ajouter des exemples de pages plus élaborées (ex: page de contact, page de fonctionnalités avec une mise en page plus complexe).
  - [ ] Fournir une petite bibliothèque de composants génériques réutilisables (ex: modales, cartes, indicateurs de chargement avancés).
- [ ] **Amélioration de la page Dashboard de base**:
  - [ ] Afficher des informations génériques pour l'utilisateur connecté (ex: date de dernière connexion, informations de profil de base).
- [ ] **Profil Utilisateur Basique**:
  - [ ] Page de profil où l'utilisateur peut voir ses informations (nom, email, image).
  - [ ] Option pour mettre à jour le nom et l'image (si pertinent pour un boilerplate).
- [ ] **Options d'Authentification Étendues**:
  - [ ] Ajouter des exemples de configuration pour d'autres fournisseurs OAuth (ex: GitHub, Google).
  - [ ] Documenter comment ajouter facilement de nouveaux fournisseurs.
- [ ] **Guide de Démarrage Rapide et Personnalisation**:
  - [ ] Améliorer le `README.md` pour expliquer comment cloner, configurer et étendre rapidement le boilerplate.
  - [ ] Fournir des instructions claires pour personnaliser le thème, ajouter des modèles Prisma, etc.

### Améliorations Techniques & DX (Déjà listées, restent pertinentes)

- [ ] **Tests Unitaires et d'Intégration** (Vitest).
- [ ] **Tests End-to-End (E2E)** (Playwright).
- [ ] **Optimisation des images** (`next/image`).
- [ ] **Amélioration de la gestion des erreurs et du logging** (Sentry, etc.).
- [ ] **Accessibilité (a11y)**.
- [ ] **Storybook pour les composants UI**.
- [ ] **Sécurité** (revue, en-têtes HTTP).
- [ ] **Optimisation des performances** (Lighthouse, bundle analysis).
- [ ] **Documentation** (décisions d'architecture, `README.md` détaillé).
- [ ] **CI/CD** (GitHub Actions).
- [ ] **Personnalisation avancée du thème Tailwind**.

### Cursor Rules Specific Tasks

- [ ] **`typescript` rule application**.
- [ ] **Revue finale des règles Cursor**.

## Implementation Plan

1.  S'assurer que l'environnement Docker est pleinement fonctionnel pour les commandes Prisma.
2.  Appliquer la règle `typescript`.
3.  Travailler sur l'amélioration du `README.md` et du guide de démarrage.
4.  Ajouter des exemples de pages et composants génériques.
5.  Augmenter progressivement la couverture des tests.

### Relevant Files

- `prisma/schema.prisma` - Modèles de données.
- `src/actions/` - Server Actions (pour la logique métier future).
- `src/app/[locale]/` - Pages et layouts de l'application.
- `src/components/` - Composants React partagés.
- `src/lib/` - Utilitaires, schémas de validation Zod.
- `messages/` - Fichiers de traduction.
- `tailwind.config.js` - Configuration de Tailwind CSS.
- `next.config.mjs` - Configuration de Next.js.
- `Dockerfile`, `docker-compose.yml` - Configuration Docker.
- `TASKS.md` - Ce fichier.

---

Ce fichier sera mis à jour au fur et à mesure de l'avancement du projet.
