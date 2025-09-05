import { SaasConfig } from '../../utils/prompts';

export function generatePrismaSchema(config: SaasConfig): string {
  let schema = `generator client {
  provider      = "prisma-client-js"
  output        = "../node_modules/.prisma/client"
  binaryTargets = ["native", "linux-arm64-openssl-3.0.x"]
}

datasource db {
  provider = "${config.database === 'mysql' ? 'mysql' : 'postgresql'}"
  url      = env("DATABASE_URL")
}

`;

  // Base User model
  let userModel = `model User {
  id            String    @id @default(cuid())
  email         String?   @unique
  name          String?
  emailVerified DateTime?
  image         String?
  passwordHash  String?
  isAdmin       Boolean   @default(false)
  createdAt     DateTime  @default(now())
  updatedAt     DateTime  @updatedAt

  accounts Account[]
  sessions Session[]`;

  // Add multi-tenancy relations if enabled
  if (config.features.multiTenant) {
    userModel += `
  memberships Membership[]
  ownedOrganizations Organization[] @relation("OrganizationOwner")`;
  }

  // Add Stripe relations if enabled
  if (config.features.stripe) {
    userModel += `
  stripeCustomerId String? @unique`;
  }

  userModel += `
}

`;

  schema += userModel;

  // Add multi-tenancy models if enabled
  if (config.features.multiTenant) {
    schema += `model Organization {
  id        String   @id @default(cuid())
  name      String
  slug      String   @unique
  logo      String?
  plan      Plan     @default(FREE)
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  owner   User   @relation("OrganizationOwner", fields: [ownerId], references: [id], onDelete: Cascade)
  ownerId String

  members Membership[]`;

    if (config.features.stripe) {
      schema += `
  stripeCustomerId     String?   @unique
  stripeSubscriptionId String?   @unique
  stripePriceId        String?
  stripeCurrentPeriodEnd DateTime?`;
    }

    schema += `
}

enum Plan {
  FREE
  PRO
  ENTERPRISE
}

enum Role {
  OWNER
  ADMIN
  MEMBER
  VIEWER
}

model Membership {
  id   String @id @default(cuid())
  role Role   @default(MEMBER)

  user   User   @relation(fields: [userId], references: [id], onDelete: Cascade)
  userId String

  organization   Organization @relation(fields: [organizationId], references: [id], onDelete: Cascade)
  organizationId String

  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  @@unique([userId, organizationId])
}

`;
  }

  // Add Stripe-specific models if enabled
  if (config.features.stripe) {
    schema += `model StripeEvent {
  id               String   @id @default(cuid())
  api_version      String?
  data             Json
  request          Json?
  type             String
  object           String
  account          String?
  created          DateTime
  livemode         Boolean
  pending_webhooks Int
  stripeId         String   @unique

  createdAt DateTime @default(now())
}

`;
  }

  // Standard NextAuth models
  schema += `model Account {
  id                String  @id @default(cuid())
  userId            String
  type              String
  provider          String
  providerAccountId String
  refresh_token     String? ${config.database === 'mysql' ? '@db.Text' : '@db.Text'}
  access_token      String? ${config.database === 'mysql' ? '@db.Text' : '@db.Text'}
  expires_at        Int?
  token_type        String?
  scope             String?
  id_token          String? ${config.database === 'mysql' ? '@db.Text' : '@db.Text'}
  session_state     String?

  user User @relation(fields: [userId], references: [id], onDelete: Cascade)

  @@unique([provider, providerAccountId])
}

model Session {
  id           String   @id @default(cuid())
  sessionToken String   @unique
  userId       String
  expires      DateTime
  user         User     @relation(fields: [userId], references: [id], onDelete: Cascade)
}

model VerificationToken {
  identifier String
  token      String   @unique
  expires    DateTime

  @@unique([identifier, token])
}

`;

  // Add audit log model for enterprise features
  if (config.features.multiTenant) {
    schema += `model AuditLog {
  id        String   @id @default(cuid())
  action    String   // CREATE, UPDATE, DELETE, etc.
  entity    String   // User, Organization, etc.
  entityId  String
  userId    String
  userEmail String
  ipAddress String?
  userAgent String?
  createdAt DateTime @default(now())

  organizationId String?
}

`;
  }

  return schema;
}