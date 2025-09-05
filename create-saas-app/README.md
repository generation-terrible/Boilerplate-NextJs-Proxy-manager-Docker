# create-saas-app

A CLI tool to create production-ready SaaS applications with Next.js, featuring modern tech stack and best practices.

## Features

- **🚀 Next.js 15** with App Router and TypeScript/JavaScript
- **🎨 Multiple UI options**: Tailwind CSS, shadcn/ui, Chakra UI, Mantine
- **🔐 Authentication**: NextAuth.js, Supabase Auth, Clerk
- **💾 Database**: PostgreSQL, MySQL, Supabase with Prisma ORM
- **💳 Billing**: Stripe integration with subscriptions
- **🏢 Multi-tenancy**: Organizations, teams, and RBAC
- **📊 Monitoring**: Sentry error tracking, PostHog analytics
- **🧪 Testing**: Vitest + Playwright configured
- **🐳 Docker**: Development and production ready
- **🌐 i18n**: Internationalization with next-intl

## Quick Start

```bash
# Create a new SaaS app
npx create-saas-app my-saas

# Or with specific options
npx create-saas-app my-saas --typescript --stripe --multi-tenant

# Or use yarn/pnpm
yarn create saas-app my-saas
pnpm create saas-app my-saas
```

## Usage

### Interactive Mode (Recommended)

```bash
npx create-saas-app my-saas
```

The CLI will prompt you to choose:
- Language (TypeScript/JavaScript)
- Styling framework (Tailwind CSS, Styled Components, CSS Modules)
- UI library (shadcn/ui, Chakra UI, Mantine, None)
- Database (PostgreSQL, MySQL, Supabase)
- Authentication (NextAuth.js, Supabase, Clerk)
- SaaS features (Stripe, Multi-tenancy, Error tracking, Analytics)
- Deployment target (Vercel, Docker, None)

### CLI Flags

```bash
npx create-saas-app my-saas [options]

Options:
  -t, --template <template>    Template to use (base, stripe, enterprise)
  --typescript                 Use TypeScript
  --javascript                 Use JavaScript  
  --tailwind                   Include Tailwind CSS
  --shadcn                     Include shadcn/ui
  --stripe                     Include Stripe integration
  --multi-tenant              Include multi-tenancy
  --skip-install              Skip package installation
  --skip-git                  Skip git initialization
  -h, --help                  Display help
```

### Examples

```bash
# Minimal SaaS setup
npx create-saas-app my-minimal-saas --javascript

# Full-featured SaaS
npx create-saas-app my-enterprise-saas --typescript --stripe --multi-tenant

# Quick prototype
npx create-saas-app my-prototype --template=base --skip-install
```

## Templates

- **`base`**: Basic Next.js SaaS setup with authentication and database
- **`stripe`**: Includes Stripe billing and subscription management  
- **`enterprise`**: Full-featured with multi-tenancy, billing, and monitoring

## What's Included

### Core Stack
- Next.js 15 with App Router
- TypeScript or JavaScript
- Tailwind CSS + shadcn/ui (configurable)
- Prisma ORM with PostgreSQL
- NextAuth.js authentication
- Internationalization (English/French)

### SaaS Features (Optional)
- Stripe billing and subscriptions
- Multi-tenant architecture (organizations + RBAC)
- User management and invitations
- Subscription management UI
- Webhook handling

### Development Tools
- ESLint configuration
- Vitest for unit testing
- Playwright for E2E testing
- Docker development environment
- GitHub Actions CI/CD templates

### Monitoring & Analytics (Optional)
- Sentry error tracking
- PostHog analytics
- Performance monitoring
- Audit logging

## Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

## License

MIT License - see [LICENSE](LICENSE) for details.

## Support

- 📖 [Documentation](https://create-saas-app.dev)
- 🐛 [Report Issues](https://github.com/your-org/create-saas-app/issues)
- 💬 [Discussions](https://github.com/your-org/create-saas-app/discussions)