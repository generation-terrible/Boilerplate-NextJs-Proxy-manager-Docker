import { SaasConfig } from '../../utils/prompts';

export function generatePackageJson(config: SaasConfig) {
  const baseDependencies = {
    "@auth/prisma-adapter": "^2.10.0",
    "@hookform/resolvers": "^5.2.1",
    "@prisma/client": "6.15.0",
    "@radix-ui/react-dialog": "^1.1.15",
    "@radix-ui/react-dropdown-menu": "^2.1.16",
    "@radix-ui/react-navigation-menu": "^1.2.14",
    "@radix-ui/react-slot": "^1.2.3",
    "bcryptjs": "^3.0.2",
    "class-variance-authority": "^0.7.1",
    "clsx": "^2.1.1",
    "lucide-react": "^0.510.0",
    "next": "15.5.2",
    "next-auth": "5.0.0-beta.28",
    "next-intl": "^4.3.6",
    "next-sitemap": "^4.2.3",
    "node-fetch": "^3.3.2",
    "react": "^19.1.1",
    "react-dom": "^19.1.1",
    "react-hook-form": "^7.62.0",
    "react-hot-toast": "^2.6.0",
    "tailwind-merge": "^3.3.1",
    "tailwindcss-animate": "^1.0.7",
    "zod": "^3.25.76",
    "zustand": "^5.0.8"
  };

  const baseDevDependencies = {
    "@eslint/js": "^9.34.0",
    "@next/eslint-plugin-next": "^15.5.2",
    "@playwright/test": "^1.55.0",
    "@testing-library/jest-dom": "^6.8.0",
    "@testing-library/react": "^16.3.0",
    "@testing-library/user-event": "^14.6.1",
    "@vitejs/plugin-react": "^4.7.0",
    "autoprefixer": "^10.4.21",
    "eslint": "^9.34.0",
    "eslint-config-next": "^15.5.2",
    "eslint-plugin-jsx-a11y": "^6.10.2",
    "eslint-plugin-react": "^7.37.5",
    "eslint-plugin-react-hooks": "^5.2.0",
    "jsdom": "^26.1.0",
    "postcss": "^8.5.6",
    "prisma": "6.15.0",
    "vitest": "^3.2.4"
  };

  // Add conditional dependencies
  if (config.styling === 'tailwind') {
    baseDependencies["tailwindcss"] = "^3.4.15";
  }

  if (config.language === 'typescript') {
    baseDevDependencies["@types/bcryptjs"] = "^2.4.6";
    baseDevDependencies["@types/node"] = "^20.10.0";
    baseDevDependencies["@types/react"] = "^18.2.45";
    baseDevDependencies["@types/react-dom"] = "^18.2.18";
    baseDevDependencies["typescript"] = "^5.3.3";
  }

  // Add SaaS-specific dependencies
  if (config.features.stripe) {
    baseDependencies["stripe"] = "^14.12.0";
    baseDependencies["@stripe/stripe-js"] = "^2.4.0";
  }

  if (config.features.errorTracking) {
    baseDependencies["@sentry/nextjs"] = "^7.99.0";
  }

  if (config.features.analytics) {
    baseDependencies["posthog-js"] = "^1.103.0";
    baseDependencies["posthog-node"] = "^4.0.1";
  }

  if (config.features.multiTenant) {
    // Additional dependencies for multi-tenancy might go here
  }

  // Database-specific dependencies
  if (config.database === 'mysql') {
    // MySQL specific packages could be added here
  } else if (config.database === 'supabase') {
    baseDependencies["@supabase/supabase-js"] = "^2.38.5";
  }

  // Auth-specific dependencies
  if (config.auth === 'supabase') {
    baseDependencies["@supabase/auth-helpers-nextjs"] = "^0.8.7";
  } else if (config.auth === 'clerk') {
    baseDependencies["@clerk/nextjs"] = "^4.29.3";
  }

  // Generate scripts based on deployment choice
  const baseScripts = {
    dev: "next dev",
    build: "next build",
    start: "prisma migrate deploy && next start",
    lint: "next lint",
    test: "vitest",
    "test:watch": "vitest --watch",
    "test:e2e": "playwright test",
    "test:e2e:report": "playwright show-report --host 0.0.0.0",
    migrate: "prisma migrate dev --name init",
    postbuild: "echo 'Starting sitemap generation...' && NODE_ENV=production next-sitemap --config next-sitemap.config.cjs --debug && echo '✅ Sitemap generation completed' && ls -la public/"
  };

  // Add Docker scripts if deployment is Docker
  if (config.deployment === 'docker') {
    baseScripts["docker:help"] = "echo '🐳 Docker Commands:\\n  docker:setup - Start development environment and setup database\\n  docker:dev - Start development environment\\n  docker:up - Start production environment\\n  docker:down - Stop containers\\n  docker:logs - View logs\\n  docker:clean - Clean all containers and volumes'";
    baseScripts["docker:build"] = "docker build -t " + config.name + " .";
    baseScripts["docker:run"] = "docker run -p 3000:3000 " + config.name;
    baseScripts["docker:up"] = "docker compose up -d";
    baseScripts["docker:down"] = "docker compose down";
    baseScripts["docker:dev"] = "docker compose -f docker-compose.dev.yml up";
    baseScripts["docker:dev:build"] = "docker compose -f docker-compose.dev.yml up --build";
    baseScripts["docker:setup"] = "docker compose -f docker-compose.dev.yml up -d && sleep 5 && docker compose -f docker-compose.dev.yml exec -T " + config.name.replace(/[^a-zA-Z0-9]/g, '_') + "-dev npx prisma db push && echo '✅ Database schema synchronized!' && docker compose -f docker-compose.dev.yml logs -f";
    baseScripts["docker:logs"] = "docker compose logs -f";
    baseScripts["docker:clean"] = "docker compose down --volumes --remove-orphans";
    // Override build script to ignore ESLint errors in Docker
    baseScripts["build"] = "next build";
  }

  return {
    name: config.name,
    version: "0.1.0",
    private: true,
    type: "module",
    scripts: baseScripts,
    dependencies: baseDependencies,
    devDependencies: baseDevDependencies
  };
}