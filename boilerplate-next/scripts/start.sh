#!/bin/sh
set -e # Quitter immédiatement si une commande échoue

echo "🚀 Applying database migrations..."
pnpm exec prisma migrate deploy
echo "✅ Database migrations applied."

echo "🔗 Starting Next.js server..."
# La variable d'environnement PORT est automatiquement utilisée par Next.js
exec node server.js 