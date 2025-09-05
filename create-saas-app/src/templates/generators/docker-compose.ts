import { SaasConfig } from '../../utils/prompts';

export function generateDockerCompose(config: SaasConfig) {
  const serviceName = config.name.replace(/[^a-zA-Z0-9]/g, '-').toLowerCase();
  const dbName = config.name.replace(/[^a-zA-Z0-9]/g, '_').toLowerCase();
  
  let services = '';
  let networks = '';
  let volumes = '';

  // Next.js application service
  services += `  ${serviceName}:
    build:
      context: .
      dockerfile: Dockerfile
    container_name: ${serviceName}-nextjs
    ports:
      - "\${NEXT_PORT:-3000}:3000"
    environment:
      - NODE_ENV=\${NODE_ENV:-development}
      - DATABASE_URL=\${DATABASE_URL}
      - AUTH_SECRET=\${AUTH_SECRET}
      - AUTH_URL=\${AUTH_URL:-http://localhost:3000}`;

  // Add Stripe environment if enabled
  if (config.features.stripe) {
    services += `
      - STRIPE_PUBLISHABLE_KEY=\${STRIPE_PUBLISHABLE_KEY}
      - STRIPE_SECRET_KEY=\${STRIPE_SECRET_KEY}
      - STRIPE_WEBHOOK_SECRET=\${STRIPE_WEBHOOK_SECRET}
      - STRIPE_PRICE_ID_PRO=\${STRIPE_PRICE_ID_PRO}
      - STRIPE_PRICE_ID_ENTERPRISE=\${STRIPE_PRICE_ID_ENTERPRISE}`;
  }

  services += `
    depends_on:
      - db
    networks:
      - ${serviceName}-network
    volumes:
      - ./:/app
      - /app/node_modules
      - /app/.next
    restart: unless-stopped

`;

  // Database service based on configuration
  if (config.database === 'postgresql') {
    services += `  db:
    image: postgres:15-alpine
    container_name: ${serviceName}-postgres
    environment:
      - POSTGRES_DB=\${POSTGRES_DB:-${dbName}}
      - POSTGRES_USER=\${POSTGRES_USER:-postgres}
      - POSTGRES_PASSWORD=\${POSTGRES_PASSWORD:-password}
    volumes:
      - postgres_data:/var/lib/postgresql/data
      - ./init.sql:/docker-entrypoint-initdb.d/init.sql
    ports:
      - "\${POSTGRES_PORT:-5432}:5432"
    networks:
      - ${serviceName}-network
    restart: unless-stopped

`;

    volumes += `volumes:
  postgres_data:
    driver: local

`;
  } else if (config.database === 'mysql') {
    services += `  db:
    image: mysql:8.0
    container_name: ${serviceName}-mysql
    environment:
      - MYSQL_ROOT_PASSWORD=\${MYSQL_ROOT_PASSWORD:-rootpassword}
      - MYSQL_DATABASE=\${MYSQL_DATABASE:-${dbName}}
      - MYSQL_USER=\${MYSQL_USER:-user}
      - MYSQL_PASSWORD=\${MYSQL_PASSWORD:-password}
    volumes:
      - mysql_data:/var/lib/mysql
    ports:
      - "\${MYSQL_PORT:-3306}:3306"
    networks:
      - ${serviceName}-network
    restart: unless-stopped

`;

    volumes += `volumes:
  mysql_data:
    driver: local

`;
  }

  // Add Redis for session storage if multi-tenant
  if (config.features.multiTenant) {
    services += `  redis:
    image: redis:7-alpine
    container_name: ${serviceName}-redis
    ports:
      - "\${REDIS_PORT:-6379}:6379"
    volumes:
      - redis_data:/data
    networks:
      - ${serviceName}-network
    restart: unless-stopped

`;

    if (!volumes) volumes = 'volumes:\n';
    if (volumes && !volumes.includes('redis_data:')) {
      volumes += `  redis_data:
    driver: local
`;
    }
  }

  // Networks
  networks = `networks:
  ${serviceName}-network:
    driver: bridge

`;

  return `services:
${services}${networks}${volumes}`;
}

export function generateDockerfile(config: SaasConfig) {
  const dockerfileContent = `# Use the official Node.js 18 runtime as a parent image
FROM node:18-alpine AS base

# Install dependencies only when needed
FROM base AS deps
# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
RUN apk add --no-cache libc6-compat
WORKDIR /app

# Install dependencies based on the preferred package manager
COPY package.json package-lock.json* pnpm-lock.yaml* yarn.lock* ./
RUN \\
  if [ -f yarn.lock ]; then yarn --frozen-lockfile; \\
  elif [ -f package-lock.json ]; then npm ci; \\
  elif [ -f pnpm-lock.yaml ]; then yarn global add pnpm && pnpm i --frozen-lockfile; \\
  else echo "Lockfile not found." && exit 1; \\
  fi

# Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Environment variables must be present at build time
# https://github.com/vercel/next.js/discussions/14030
ENV NEXT_TELEMETRY_DISABLED 1

# Generate Prisma Client
RUN npx prisma generate

# Build the application
RUN npm run build

# Production image, copy all the files and run next
FROM base AS runner
WORKDIR /app

ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1

# Create a non-root user to run the application
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Copy the public folder
COPY --from=builder /app/public ./public

# Copy the built application
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

# Copy Prisma files
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/node_modules/.prisma ./node_modules/.prisma

USER nextjs

EXPOSE 3000

ENV PORT 3000
ENV HOSTNAME "0.0.0.0"

# Run migrations and start the server
CMD ["sh", "-c", "npx prisma migrate deploy && node server.js"]`;

  return dockerfileContent;
}

export function generateDockerIgnore() {
  return `# Dependencies
node_modules
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# Runtime data
pids
*.pid
*.seed
*.pid.lock

# Coverage directory used by tools like istanbul
coverage
*.nyc_output

# Environment variables
.env
.env.local
.env.development.local
.env.test.local
.env.production.local

# Next.js
.next/
out/

# Nuxt.js
.nuxt
dist

# Gatsby files
.cache/
public

# Storybook build outputs
.out
.storybook-out

# IDE
.vscode/
.idea/

# OS
.DS_Store
Thumbs.db

# Logs
logs
*.log

# Git
.git
.gitignore

# Docker
Dockerfile
.dockerignore
docker-compose*.yml

# Misc
README.md
.editorconfig
.eslintrc.json`;
}

export function generateDevDockerCompose(config: SaasConfig) {
  const serviceName = config.name.replace(/[^a-zA-Z0-9]/g, '-').toLowerCase();
  const dbName = config.name.replace(/[^a-zA-Z0-9]/g, '_').toLowerCase();
  
  let services = '';
  let networks = '';
  let volumes = '';

  // Next.js development service
  services += `  ${serviceName}-dev:
    build:
      context: .
      dockerfile: Dockerfile.dev
      args:
        - NODE_ENV=development
    container_name: ${serviceName}-nextjs-dev
    ports:
      - "\${NEXT_PORT:-3000}:3000"
    environment:
      - NODE_ENV=development
      - DATABASE_URL=\${DATABASE_URL}
      - AUTH_SECRET=\${AUTH_SECRET}
      - AUTH_URL=\${AUTH_URL:-http://localhost:3000}`;

  // Add Stripe environment if enabled
  if (config.features.stripe) {
    services += `
      - STRIPE_PUBLISHABLE_KEY=\${STRIPE_PUBLISHABLE_KEY}
      - STRIPE_SECRET_KEY=\${STRIPE_SECRET_KEY}
      - STRIPE_WEBHOOK_SECRET=\${STRIPE_WEBHOOK_SECRET}`;
  }

  services += `
    depends_on:
      - db
    networks:
      - ${serviceName}-network
    volumes:
      - ./:/app
      - /app/node_modules
      - /app/.next
    restart: unless-stopped
    command: npm run dev

`;

  // Database service (same as production)
  if (config.database === 'postgresql') {
    services += `  db:
    image: postgres:15-alpine
    container_name: ${serviceName}-postgres-dev
    environment:
      - POSTGRES_DB=\${POSTGRES_DB:-${dbName}_dev}
      - POSTGRES_USER=\${POSTGRES_USER:-postgres}
      - POSTGRES_PASSWORD=\${POSTGRES_PASSWORD:-password}
    volumes:
      - postgres_data_dev:/var/lib/postgresql/data
    ports:
      - "\${POSTGRES_PORT:-5432}:5432"
    networks:
      - ${serviceName}-network
    restart: unless-stopped

`;

    volumes += `volumes:
  postgres_data_dev:
    driver: local

`;
  }

  // Networks
  networks = `networks:
  ${serviceName}-network:
    driver: bridge

`;

  return `services:
${services}${networks}${volumes}`;
}

export function generateDevDockerfile() {
  return `FROM node:18-alpine

# Install dependencies for development
RUN apk add --no-cache libc6-compat git

WORKDIR /app

# Copy package files
COPY package*.json ./
COPY pnpm-lock.yaml* ./

# Install dependencies
RUN npm ci

# Copy source code
COPY . .

# Generate Prisma Client
RUN npx prisma generate

EXPOSE 3000

# Development command
CMD ["npm", "run", "dev"]`;
}