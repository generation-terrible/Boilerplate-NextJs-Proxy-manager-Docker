# Configuration Stripe pour le Boilerplate Next.js

Ce guide vous explique comment configurer Stripe dans votre application boilerplate Next.js.

## 🚀 Configuration rapide

### 1. Créer un compte Stripe

1. Allez sur [dashboard.stripe.com](https://dashboard.stripe.com)
2. Créez un compte ou connectez-vous
3. Activez le mode **Test** pour le développement

### 2. Récupérer les clés API

Dans votre dashboard Stripe, allez dans **Développeurs > Clés API** :

- **Clé publique** : `pk_test_...` (commence par `pk_test_`)
- **Clé secrète** : `sk_test_...` (commence par `sk_test_`)

### 3. Configurer les variables d'environnement

Modifiez votre fichier `.env` :

```bash
# Stripe Configuration
STRIPE_PUBLISHABLE_KEY=pk_test_votre_cle_publique_ici
STRIPE_SECRET_KEY=sk_test_votre_cle_secrete_ici
STRIPE_WEBHOOK_SECRET=whsec_votre_secret_webhook_ici
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_votre_cle_publique_ici
```

**Important** : 
- `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` doit être identique à `STRIPE_PUBLISHABLE_KEY`
- Ne jamais exposer la clé secrète côté client

## 🎛️ Dashboard Admin

Une fois configuré, vous aurez accès au dashboard admin Stripe à l'adresse :
- **URL** : `/admin/stripe`
- **Accès** : Réservé aux utilisateurs admin

### Fonctionnalités disponibles

#### 📊 Métriques en temps réel
- Chiffre d'affaires total et mensuel
- Nombre de clients
- Abonnements actifs
- Taux de résiliation (churn rate)

#### 💳 Paiements récents
- Liste des derniers paiements
- Statuts (Réussi, En attente, Échoué)
- Informations clients

#### ⚡ Actions rapides
- Gestion des clients
- Gestion des abonnements  
- Rapports de paiement
- Configuration des webhooks

#### 🔗 Liens externes
- Dashboard Stripe officiel
- Paiements de test
- Gestion des clients

## 🔗 Configuration des Webhooks

### 1. Créer un endpoint webhook

Dans le dashboard Stripe, allez dans **Développeurs > Webhooks** :

1. Cliquez sur **Ajouter un endpoint**
2. URL : `https://votre-domaine.com/api/stripe/webhook`
3. Sélectionnez les événements à écouter

### 2. Événements recommandés

```bash
# Paiements
payment_intent.succeeded
payment_intent.payment_failed

# Clients
customer.created
customer.updated

# Abonnements
customer.subscription.created
customer.subscription.updated
customer.subscription.deleted

# Factures
invoice.payment_succeeded
invoice.payment_failed
```

### 3. Récupérer le secret webhook

Après création, récupérez le **secret de signature** et ajoutez-le dans `.env` :

```bash
STRIPE_WEBHOOK_SECRET=whsec_votre_secret_ici
```

## 🧪 Tests avec Stripe

### Cartes de test

Utilisez ces numéros de carte pour vos tests :

```bash
# Paiement réussi
4242 4242 4242 4242

# Paiement refusé
4000 0000 0000 0002

# Authentification requise
4000 0000 0000 3220
```

**Détails de test** :
- **Date d'expiration** : N'importe quelle date future
- **CVC** : N'importe quel code à 3 chiffres
- **Code postal** : N'importe quel code valide

### Webhooks en local

Pour tester les webhooks localement, utilisez Stripe CLI :

```bash
# Installation
npm install -g @stripe/stripe-cli

# Connexion
stripe login

# Redirection des webhooks
stripe listen --forward-to localhost:3000/api/stripe/webhook
```

## 🛠️ Architecture technique

### Fichiers clés

```bash
src/
├── lib/
│   ├── stripe.ts           # Configuration Stripe serveur
│   ├── stripe-client.ts    # Configuration Stripe client
│   └── stripe-admin.ts     # Services admin Stripe
├── app/[locale]/
│   ├── api/stripe/
│   │   └── webhook/route.ts # Gestionnaire webhooks
│   └── admin/stripe/
│       └── page.tsx        # Dashboard admin
└── components/admin/stripe/
    ├── StripeStats.tsx     # Statistiques
    ├── StripeRecentPayments.tsx # Paiements récents
    └── StripeQuickActions.tsx   # Actions rapides
```

### Services disponibles

Le fichier `stripe-admin.ts` expose plusieurs services :

```typescript
// Statistiques générales
StripeAdminService.getStats()

// Paiements récents
StripeAdminService.getRecentPayments(limit)

// Clients avec statistiques
StripeAdminService.getCustomersWithStats(limit)

// Lien dashboard Stripe
StripeAdminService.createDashboardLink()
```

## 🔒 Sécurité

### Bonnes pratiques

1. **Variables d'environnement**
   - Ne jamais commit les clés secrètes
   - Utiliser `.env.local` pour les secrets locaux
   - Différencier environnements test/production

2. **Validation des webhooks**
   - Toujours vérifier la signature Stripe
   - Utiliser `stripe.webhooks.constructEvent()`

3. **Gestion des erreurs**
   - Logger les erreurs Stripe
   - Gérer les timeouts API
   - Retry automatique en cas d'échec

### Mode production

Pour passer en production :

1. Remplacez `pk_test_` par `pk_live_`
2. Remplacez `sk_test_` par `sk_live_` 
3. Configurez les webhooks sur votre domaine de production
4. Activez le mode live dans Stripe

## 📚 Ressources utiles

- [Documentation Stripe](https://stripe.com/docs)
- [Next.js + Stripe](https://stripe.com/docs/recipes/nextjs)
- [Webhooks Stripe](https://stripe.com/docs/webhooks)
- [Cartes de test](https://stripe.com/docs/testing)

## 🆘 Dépannage

### Erreurs courantes

**1. "Invalid API Key"**
- Vérifiez que les clés sont correctes
- Assurez-vous d'utiliser les bonnes clés (test vs live)

**2. "Webhook signature verification failed"**
- Vérifiez `STRIPE_WEBHOOK_SECRET`
- Assurez-vous que l'URL du webhook est correcte

**3. "Rate limit exceeded"**
- Implémentez un système de retry
- Réduisez la fréquence des appels API

**4. Traductions manquantes**
- Vérifiez les fichiers `messages/fr.json` et `messages/en.json`
- Section `StripeAdmin` doit être présente

Pour toute question, consultez la [documentation officielle Stripe](https://stripe.com/docs) ou créez une issue sur le repository du projet.