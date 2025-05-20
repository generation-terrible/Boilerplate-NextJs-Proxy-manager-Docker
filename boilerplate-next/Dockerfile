# Use the official Node.js 20 image as the base image
FROM node:20

# Installer pnpm globalement
RUN npm install -g pnpm

# Set the working directory inside the container
WORKDIR /app

# Copier package.json et pnpm-lock.yaml
COPY package.json ./
COPY pnpm-lock.yaml ./

# Installer les dépendances
RUN pnpm install

# Copier le reste du code de l'application
COPY . .

# Générer le client Prisma
RUN pnpm exec prisma generate

# Build de l'application Next.js
RUN pnpm run build

# Exposer le port de l'application Next.js
EXPOSE 3000

# Démarrer l'application Next.js
CMD ["pnpm", "run", "dev"]

