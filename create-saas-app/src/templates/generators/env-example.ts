import { SaasConfig } from '../../utils/prompts';

export function generateEnvExample(config: SaasConfig): string {
  let envContent = `# Application
APP_URL=http://localhost:3000
NODE_ENV=development
NPM_SCRIPT=dev

# Default user (for seeding)
DEFAULT_EMAIL="admin@${config.name}.com"

# Docker configuration${config.deployment === 'docker' ? '' : ' (uncomment if using Docker)'}
${config.deployment === 'docker' ? '' : '# '}DOCKERFILE="Dockerfile"
${config.deployment === 'docker' ? '' : '# '}PROXY_NETWORK_NAME="${config.name}-proxy"
${config.deployment === 'docker' ? '' : '# '}NEXT_JS_CONTAINER_NAME=${config.name}-nextjs
${config.deployment === 'docker' ? '' : '# '}NEXT_PORT=3000

# Database configuration
POSTGRES_PASSWORD=yourpassword
POSTGRES_USER=youruser
POSTGRES_DB=${config.name.replace(/-/g, '_')}_db
DATABASE_URL="${config.deployment === 'docker' ? `postgresql://youruser:yourpassword@db:5432/${config.name.replace(/-/g, '_')}_db` : `postgresql://youruser:yourpassword@localhost:5432/${config.name.replace(/-/g, '_')}_db`}"

# Authentication
AUTH_URL=http://localhost:3000
AUTH_SECRET=your-super-secret-jwt-secret-here-make-it-long-and-random

`;

  // Add Stripe configuration if enabled
  if (config.features.stripe) {
    envContent += `# Stripe (https://dashboard.stripe.com/apikeys)
STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...

# Stripe Products (create these in your Stripe dashboard)
STRIPE_PRICE_ID_PRO=price_...
STRIPE_PRICE_ID_ENTERPRISE=price_...

`;
  }

  // Add Supabase configuration if selected
  if (config.database === 'supabase' || config.auth === 'supabase') {
    envContent += `# Supabase (https://supabase.com/dashboard)
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...
SUPABASE_SERVICE_ROLE_KEY=eyJ...

`;
  }

  // Add Clerk configuration if selected
  if (config.auth === 'clerk') {
    envContent += `# Clerk (https://dashboard.clerk.com)
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/dashboard
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/dashboard

`;
  }

  // Add Sentry configuration if enabled
  if (config.features.errorTracking) {
    envContent += `# Sentry (https://sentry.io)
NEXT_PUBLIC_SENTRY_DSN=https://...@sentry.io/...
SENTRY_ORG=your-org
SENTRY_PROJECT=your-project
SENTRY_AUTH_TOKEN=your-auth-token

`;
  }

  // Add PostHog configuration if enabled
  if (config.features.analytics) {
    envContent += `# PostHog (https://posthog.com)
NEXT_PUBLIC_POSTHOG_KEY=phc_...
NEXT_PUBLIC_POSTHOG_HOST=https://app.posthog.com

`;
  }

  // Add email service configuration
  envContent += `# Email Service (choose one)
# Resend (https://resend.com)
RESEND_API_KEY=re_...

# Postmark (https://postmarkapp.com)
# POSTMARK_API_TOKEN=your-token

# SendGrid (https://sendgrid.com)  
# SENDGRID_API_KEY=SG...

`;

  // Add upload service configuration
  envContent += `# File Upload (optional)
# Uploadthing (https://uploadthing.com)
# UPLOADTHING_SECRET=sk_live_...
# UPLOADTHING_APP_ID=your-app-id

# Cloudinary (https://cloudinary.com)
# CLOUDINARY_CLOUD_NAME=your-cloud-name
# CLOUDINARY_API_KEY=your-api-key
# CLOUDINARY_API_SECRET=your-api-secret

`;

  return envContent;
}