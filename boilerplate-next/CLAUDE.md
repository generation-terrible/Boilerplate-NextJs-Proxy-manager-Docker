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

## Visual Development & Testing

### Design System

The project follows S-Tier SaaS design standards inspired by Stripe, Airbnb, and Linear. All UI development must adhere to:

- **Design Principles**: `/context/design-principles.md` - Comprehensive checklist for world-class UI
- **Component Library**: NextUI with custom Tailwind configuration

### Quick Visual Check

**IMMEDIATELY after implementing any front-end change:**

1. **Identify what changed** - Review the modified components/pages
2. **Navigate to affected pages** - Use `mcp__playwright__browser_navigate` to visit each changed view
3. **Verify design compliance** - Compare against `/context/design-principles.md`
4. **Validate feature implementation** - Ensure the change fulfills the user's specific request
5. **Check acceptance criteria** - Review any provided context files or requirements
6. **Capture evidence** - Take full page screenshot at desktop viewport (1440px) of each changed view
7. **Check for errors** - Run `mcp__playwright__browser_console_messages` ⚠️

This verification ensures changes meet design standards and user requirements.

### Comprehensive Design Review

For significant UI changes or before merging PRs, use the design review agent:

```bash
# Option 1: Use the slash command
/design-review

# Option 2: Invoke the agent directly
@agent-design-review
```

The design review agent will:

- Test all interactive states and user flows
- Verify responsiveness (desktop/tablet/mobile)
- Check accessibility (WCAG 2.1 AA compliance)
- Validate visual polish and consistency
- Test edge cases and error states
- Provide categorized feedback (Blockers/High/Medium/Nitpicks)

### Playwright MCP Integration

#### Essential Commands for UI Testing

```javascript
// Navigation & Screenshots
mcp__playwright__browser_navigate(url); // Navigate to page
mcp__playwright__browser_take_screenshot(); // Capture visual evidence
mcp__playwright__browser_resize(width, height); // Test responsiveness

// Interaction Testing
mcp__playwright__browser_click(element); // Test clicks
mcp__playwright__browser_type(element, text); // Test input
mcp__playwright__browser_hover(element); // Test hover states

// Validation
mcp__playwright__browser_console_messages(); // Check for errors
mcp__playwright__browser_snapshot(); // Accessibility check
mcp__playwright__browser_wait_for(text / element); // Ensure loading
```

### Design Compliance Checklist

When implementing UI features, verify:

- [ ] **Visual Hierarchy**: Clear focus flow, appropriate spacing
- [ ] **Consistency**: Uses design tokens, follows patterns
- [ ] **Responsiveness**: Works on mobile (375px), tablet (768px), desktop (1440px)
- [ ] **Accessibility**: Keyboard navigable, proper contrast, semantic HTML
- [ ] **Performance**: Fast load times, smooth animations (150-300ms)
- [ ] **Error Handling**: Clear error states, helpful messages
- [ ] **Polish**: Micro-interactions, loading states, empty states

## When to Use Automated Visual Testing

### Use Quick Visual Check for:

- Every front-end change, no matter how small
- After implementing new components or features
- When modifying existing UI elements
- After fixing visual bugs
- Before committing UI changes

### Use Comprehensive Design Review for:

- Major feature implementations
- Before creating pull requests with UI changes
- When refactoring component architecture
- After significant design system updates
- When accessibility compliance is critical

### Skip Visual Testing for:

- Backend-only changes (API, database)
- Configuration file updates
- Documentation changes
- Test file modifications
- Non-visual utility functions

## Environment Setup

Requires these environment variables:

- `DATABASE_URL` - PostgreSQL connection string
- NextAuth configuration variables
- Pusher API credentials
- Cloudinary configuration
- Email service credentials (Resend)

## Additional Context

- Design review agent configuration: `/.claude/agents/design-review-agent.md`
- Design principles checklist: `/context/design-principles.md`
- Custom slash commands: `/context/design-review-slash-command.md`
