# 🚀 SaaS Boilerplate - Next.js 15 TypeScript

> Production-ready SaaS boilerplate built with Next.js 15, TypeScript, and modern web technologies.

A comprehensive, full-stack boilerplate designed for rapid SaaS application development. Features authentication, internationalization, database management, and Docker containerization out of the box.

## ✨ Features

### Core Framework
- 🚀 **Next.js 15** - Latest App Router with Server Components
- 🏷️ **TypeScript** - Full type safety across the codebase
- 🐘 **PostgreSQL** - Robust database with Docker containerization
- 🔄 **Prisma ORM** - Type-safe database operations

### Authentication & Security
- 🔐 **NextAuth.js v5** - Complete authentication solution
- 🛡️ **Server Actions** - Secure server-side operations
- 🔑 **JWT & Session Management** - Flexible auth strategies

### UI/UX & Styling
- 🎨 **Tailwind CSS v3** - Utility-first styling
- 🌙 **Multi-theme Support** - Dark/light mode ready
- 📱 **Responsive Design** - Mobile-first approach
- 🎯 **shadcn/ui Components** - Modern UI component library

### Internationalization
- 🌍 **next-intl v4** - Complete i18n solution
- 🚦 **Locale-based Routing** - `/en`, `/fr` route structure
- 📄 **JSON Translation Files** - Easy content management

### Forms & Validation
- 📋 **React Hook Form** - Performant form handling
- ✅ **Zod Validation** - Runtime type validation
- 🎯 **Type-safe Forms** - End-to-end type safety

### Testing & Quality
- 🧪 **Vitest** - Fast unit testing framework
- 🎭 **Playwright** - End-to-end testing suite
- 🔍 **ESLint** - Code linting with flat config
- 📏 **TypeScript Strict Mode** - Maximum type safety

### DevOps & Deployment
- 🐳 **Docker & Docker Compose** - Complete containerization
- 📦 **pnpm** - Fast, efficient package management
- 🔄 **Hot Reload** - Development experience
- 🚀 **Production Ready** - Optimized builds

## 🚀 Quick Start

### Prerequisites

- **Node.js** 18.x or higher ([Download](https://nodejs.org/))
- **pnpm** ([Installation Guide](https://pnpm.io/installation))
- **Docker & Docker Compose** ([Get Started](https://www.docker.com/get-started/))

### Installation

#### Option 1: Using create-saas-app CLI (Recommended)

```bash
npx create-saas-app@latest my-saas-app
cd my-saas-app
```

#### Option 2: Manual Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/generation-terrible/Boilerplate-NextJs-Proxy-manager-Docker.git
   cd Boilerplate-NextJs-Proxy-manager-Docker/boilerplate-next
   ```

2. **Environment Configuration**
   ```bash
   cp .env.example .env
   ```
   
   Configure your environment variables:
   ```env
   # Database
   DATABASE_URL="postgresql://user:password@postgres:5432/mydb?schema=public"
   
   # NextAuth.js
   NEXTAUTH_SECRET="your-secret-key"
   NEXTAUTH_URL="http://localhost:3000"
   
   # App Configuration
   APP_URL="http://localhost:3000"
   ```

3. **Start with Docker (Recommended)**
   ```bash
   # Build and start all services
   docker compose up -d --build
   
   # Setup database (run once)
   npm run docker:setup
   ```

4. **Alternative: Local Development**
   ```bash
   # Install dependencies
   pnpm install
   
   # Setup database
   pnpm prisma migrate dev
   pnpm prisma generate
   
   # Start development server
   pnpm dev
   ```

5. **Access the application**
   Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📋 Available Commands

### Docker Commands
```bash
# Start all services
docker compose up -d --build

# Stop all services
docker compose down

# View logs
docker compose logs -f nextjs

# Setup database (initial setup)
npm run docker:setup

# Database operations
npm run docker:db:migrate
npm run docker:db:reset
npm run docker:db:seed
```

### Development Commands
```bash
# Install dependencies
pnpm install

# Development server
pnpm dev

# Build for production
pnpm build

# Start production server
pnpm start

# Type checking
pnpm type-check

# Linting
pnpm lint
pnpm lint:fix
```

### Database Commands
```bash
# Run migrations
pnpm prisma migrate dev

# Generate Prisma client
pnpm prisma generate

# Open Prisma Studio
pnpm prisma studio

# Reset database
pnpm prisma migrate reset
```

### Testing Commands
```bash
# Run unit tests
pnpm test

# Run E2E tests
pnpm test:e2e

# View test report
pnpm test:e2e:report
```

## 📁 Project Structure

```
boilerplate-next/
├── docs/                     # Project documentation
│   ├── STRIPE_SETUP.md      # Stripe integration guide
│   ├── GOOGLE_OAUTH_SETUP.md # Google OAuth configuration
│   └── SAAS_ROADMAP.md      # SaaS feature roadmap
├── messages/                 # i18n translation files
│   ├── en.json
│   └── fr.json
├── prisma/                   # Database schema and migrations
│   ├── schema.prisma
│   ├── migrations/
│   └── seed.ts
├── public/                   # Static assets
├── src/
│   ├── actions/             # Next.js Server Actions
│   ├── app/[locale]/        # App Router pages (i18n)
│   │   ├── (auth)/         # Auth pages group
│   │   ├── dashboard/      # Protected dashboard
│   │   ├── globals.css     # Global styles
│   │   ├── layout.tsx      # Root layout
│   │   └── page.tsx        # Home page
│   ├── components/         # React components
│   │   ├── client/        # Client-side components
│   │   ├── forms/         # Form components
│   │   ├── providers/     # Context providers
│   │   └── ui/           # shadcn/ui components
│   ├── hooks/             # Custom React hooks
│   ├── i18n/              # Internationalization config
│   │   ├── request.ts     # Server-side i18n
│   │   └── routing.ts     # i18n routing config
│   ├── lib/               # Utility functions
│   │   ├── auth.ts        # NextAuth configuration
│   │   ├── db.ts          # Prisma client
│   │   └── validations/   # Zod schemas
│   ├── types/             # TypeScript definitions
│   └── middleware.ts      # Next.js middleware
├── tests/                  # E2E tests
├── docker-compose.yml      # Docker services
├── Dockerfile             # Application container
└── package.json           # Dependencies and scripts
```

## 🔧 Configuration

### Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `DATABASE_URL` | PostgreSQL connection string | `postgresql://user:password@postgres:5432/mydb` |
| `NEXTAUTH_SECRET` | NextAuth.js secret key | Required |
| `NEXTAUTH_URL` | Application URL | `http://localhost:3000` |
| `APP_URL` | Public application URL | `http://localhost:3000` |

### Database Schema

The boilerplate includes a basic user management schema:
- User authentication with NextAuth.js
- Session management
- Extensible user profile structure

### Internationalization

Supported locales:
- 🇺🇸 English (`en`)
- 🇫🇷 French (`fr`)

Routes are automatically prefixed with locale (`/en/dashboard`, `/fr/dashboard`).

## 🚀 Deployment

### Docker Production

```bash
# Build production image
docker build -t my-saas-app .

# Run with docker-compose
docker compose -f docker-compose.prod.yml up -d
```

### Manual Deployment

```bash
# Build the application
pnpm build

# Start production server
pnpm start
```

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📚 Documentation

Detailed setup guides are available in the `docs/` folder:

- **[Stripe Setup](docs/STRIPE_SETUP.md)** - Complete Stripe integration guide
- **[Google OAuth Setup](docs/GOOGLE_OAUTH_SETUP.md)** - Google authentication configuration
- **[SaaS Roadmap](docs/SAAS_ROADMAP.md)** - Feature development roadmap

## 🎯 Next Steps

After setting up the boilerplate, consider:

- [ ] Following the [Stripe Setup Guide](docs/STRIPE_SETUP.md) for payment integration
- [ ] Configuring Google OAuth using [Google OAuth Setup](docs/GOOGLE_OAUTH_SETUP.md)
- [ ] Customizing the authentication providers in `src/lib/auth.ts`
- [ ] Adding your business logic in `src/actions/`
- [ ] Extending the database schema in `prisma/schema.prisma`
- [ ] Adding more translations in `messages/`
- [ ] Implementing your UI components
- [ ] Setting up CI/CD pipelines
- [ ] Configuring production environment variables

---

**Built with ❤️ using Next.js 15 and TypeScript**
