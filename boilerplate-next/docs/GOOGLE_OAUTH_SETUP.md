# Configuration Google OAuth

Ce guide vous aide à configurer Google OAuth pour permettre la connexion/inscription via Google.

## Étapes de configuration

### 1. Créer un projet Google Cloud

1. Allez sur [Google Cloud Console](https://console.cloud.google.com/)
2. Créez un nouveau projet ou sélectionnez un projet existant
3. Activez l'API Google+ (ou Google People API)

### 2. Créer des identifiants OAuth 2.0

1. Dans la console Google Cloud, allez dans **APIs & Services > Credentials**
2. Cliquez sur **Create Credentials > OAuth 2.0 Client IDs**
3. Configurez l'écran de consentement OAuth si nécessaire :
   - Type d'application : External (pour les utilisateurs publics) ou Internal (pour G Workspace uniquement)
   - Nom de l'application : Nom de votre application
   - Email de support utilisateur : Votre email
   - Logo de l'application (optionnel)
   - Domaine autorisé : votre domaine (pour la production)

### 3. Configurer les URI de redirection

Dans la configuration de votre client OAuth 2.0 :

**Pour le développement :**
- `http://localhost:3000/api/auth/callback/google`

**Pour la production :**
- `https://votre-domaine.com/api/auth/callback/google`

### 4. Récupérer les clés

Après avoir créé le client OAuth 2.0, vous obtiendrez :
- **Client ID** : Commence par `xxx.apps.googleusercontent.com`
- **Client Secret** : Une chaîne de caractères secrète

### 5. Configurer les variables d'environnement

Ajoutez ces variables dans votre fichier `.env` :

```env
GOOGLE_CLIENT_ID=votre_google_client_id_ici
GOOGLE_CLIENT_SECRET=votre_google_client_secret_ici
```

### 6. Redémarrer l'application

Après avoir configuré les variables d'environnement :

```bash
# Si vous utilisez Docker
docker compose restart nextjs

# Ou redémarrez votre serveur de développement
pnpm dev
```

## Test de la configuration

1. Allez sur `/login` ou `/register`
2. Cliquez sur le bouton "Continuer avec Google" ou "S'inscrire avec Google"
3. Vous devriez être redirigé vers Google pour l'authentification
4. Après autorisation, vous serez redirigé vers votre application

## Résolution des problèmes courants

### Erreur "redirect_uri_mismatch"
- Vérifiez que l'URI de redirection dans Google Cloud Console correspond exactement à celle utilisée par votre application
- Format attendu : `http://localhost:3000/api/auth/callback/google` (développement) ou `https://votre-domaine.com/api/auth/callback/google` (production)

### Erreur "invalid_client"
- Vérifiez que `GOOGLE_CLIENT_ID` et `GOOGLE_CLIENT_SECRET` sont correctement configurés
- Assurez-vous qu'il n'y a pas d'espaces en début ou fin de ces variables

### L'utilisateur n'est pas créé
- Vérifiez que votre base de données est accessible
- Consultez les logs de l'application pour voir les erreurs de création d'utilisateur

## Sécurité

- **Ne jamais** commiter vos clés Google dans votre code source
- Utilisez des variables d'environnement différentes pour le développement et la production
- Configurez les domaines autorisés dans Google Cloud Console pour la production
- Limitez les scopes demandés au minimum nécessaire

## Scopes utilisés

Par défaut, cette configuration demande :
- `openid` : Identification de base
- `email` : Accès à l'email de l'utilisateur
- `profile` : Accès au nom et photo de profil

Ces informations sont suffisantes pour créer un compte utilisateur dans votre application.