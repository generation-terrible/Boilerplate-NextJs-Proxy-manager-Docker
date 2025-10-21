# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

### Core Development
- `pnpm dev` - Start Next.js development server
- `pnpm build` - Build the application for production
- `pnpm start` - Start production server (runs migrations first)
- `pnpm lint` - Run ESLint linting

### Testing
- `pnpm test` - Run Vitest unit tests
- `pnpm test:watch` - Run Vitest in watch mode  
- `pnpm test:e2e` - Run Playwright end-to-end tests
- `pnpm test:e2e:report` - View Playwright test report

### Database
- `pnpm migrate` - Run Prisma migrations
- `prisma generate` - Generate Prisma client
- `prisma studio` - Open Prisma Studio (database GUI)

### Docker Development
- `docker compose up -d --build` - Start all services (Next.js, PostgreSQL, Playwright)
- `docker compose exec nextjs pnpm <command>` - Run commands inside Next.js container
- `docker compose exec playwright pnpm test:e2e` - Run E2E tests in container
- `docker compose down` - Stop all services

## Architecture Overview

### Tech Stack
- **Framework**: Next.js 15 with App Router
- **Language**: Mixed JavaScript/TypeScript (transitioning from JS to TS)
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: NextAuth.js 5.0 (beta)
- **Styling**: Tailwind CSS with shadcn/ui components
- **Internationalization**: next-intl with French/English support
- **State Management**: Zustand for theme management
- **Forms**: React Hook Form + Zod validation
- **Testing**: Vitest + React Testing Library, Playwright for E2E

### Project Structure
- `src/app/[locale]/` - Internationalized App Router pages and layouts
- `src/components/` - React components organized by type (ui/, forms/, layout/, etc.)
- `src/lib/` - Shared utilities (Prisma client, schemas, utils)
- `src/i18n/` - Internationalization configuration
- `src/auth.js` - NextAuth configuration entry point
- `messages/` - Translation files (en.json, fr.json)
- `prisma/` - Database schema and migrations

### Authentication Architecture
- NextAuth.js v5 beta with custom configuration in `src/app/api/auth/[...nextauth]/`
- Prisma adapter for database sessions
- Email/password authentication with bcrypt
- User model includes admin role support

### Internationalization
- next-intl with locale-based routing (`/en/*`, `/fr/*`)
- Default locale: French (`fr`)
- Supported locales: English (`en`), French (`fr`)
- Translation files in `messages/` directory
- Locale prefix: always (routes always include locale)

### UI Components
- shadcn/ui components in `src/components/ui/`
- Custom components use Tailwind CSS
- Theme switching with Zustand store
- Responsive design patterns

### Database Schema
- User authentication tables (User, Account, Session, VerificationToken)
- User model includes: id, email, name, passwordHash, isAdmin, timestamps
- Prisma configured for PostgreSQL with multi-platform binary targets

## Important Configuration Notes

### Environment Variables Required
- `DATABASE_URL` - PostgreSQL connection string
- `AUTH_SECRET` - NextAuth secret key
- `AUTH_URL` - Application URL for NextAuth
- PostgreSQL vars: `POSTGRES_PASSWORD`, `POSTGRES_DB`, `POSTGRES_USER`

### Docker Environment
- Development uses Docker Compose with volume mounting
- Playwright runs in separate container for E2E testing
- PostgreSQL data persisted in Docker volume
- Ports: 3000 (Next.js), 5432 (PostgreSQL), 5555 (Prisma Studio), 9323 (Playwright reports)

### Code Conventions
- Mixed JS/TS codebase (currently on `no-typescript` branch)
- ESLint with flat config format
- React components use JSX (some TSX files exist)
- Prisma schema uses cuid() for IDs
- Server Actions pattern for backend logic

### TypeScript Migration Note
The project is in transition from JavaScript to TypeScript. Some files exist in both .js and .tsx/.ts versions. When making changes:
- Check if TypeScript version exists before creating new files
- Follow existing patterns in similar components
- The `next.config.mjs` has `ignoreBuildErrors: true` for TypeScript during transition