# 🚀 Teleese API - Plateforme d’Assistance et de Réservation intelligente

## 📌 Description du projet

**Teleese API** est le cœur backend d’une plateforme d’assistance, de réservation et de gestion des compagnies basée sur l’intelligence artificielle. Elle offre un système d’authentification robuste, une gestion multi-rôles, la création interactive de compagnies et une architecture modulaire basée sur une clean architecture.

## ❓ Pourquoi ce projet ?

Ce projet est né du besoin d’offrir aux entreprises un assistant numérique intelligent capable :

- ✅ de guider les clients par la voix ou le texte 📞💬
- ✅ de gérer les réservations 🗓️
- ✅ d’organiser les ressources internes via une interface moderne 🛠️
- ✅ de s’adapter à tout type de compagnie (restaurant, hôtel, salon de coiffure, etc.) grâce à une configuration dynamique et personnalisée 🎯

## 🧰 Technologies & outils utilisés

| Outil / Tech | Description | Documentation |
|--------------|-------------|----------------|
| [**Node.js**](https://nodejs.org) | Runtime JavaScript côté serveur | [Lien](https://nodejs.org) |
| [**TypeScript**](https://www.typescriptlang.org/) | Superset de JavaScript typé | [Lien](https://www.typescriptlang.org/docs/) |
| [**Fastify**](https://fastify.dev/) | Framework Node.js ultra rapide | [Lien](https://www.fastify.dev/docs/latest/) |
| [**MongoDB**](https://www.mongodb.com/) | Base de données NoSQL | [Lien](https://www.mongodb.com/docs/) |
| [**Mongoose**](https://mongoosejs.com/) | ODM pour MongoDB | [Lien](https://mongoosejs.com/docs/) |
| [**OpenAI**](https://platform.openai.com/) | Génération de contenu IA | [Lien](https://platform.openai.com/docs/) |
| [**Docker**](https://www.docker.com/) | Conteneurisation des services | [Lien](https://docs.docker.com/) |
| [**Swagger (OpenAPI)**](https://swagger.io/) | Documentation interactive d'API | [Lien](https://swagger.io/specification/) |
| [**Pino**](https://getpino.io/#/) | Logger JSON haute performance | [Lien](https://getpino.io/#/) |
| [**Jest**](https://jestjs.io/) | Framework de tests unitaires | [Lien](https://jestjs.io/docs/getting-started) |
| [**nodemailer**](https://nodemailer.com/about/) | Envoi d'e-mails via SMTP | [Lien](https://nodemailer.com/about/) |
| [**VAPI**](https://docs.vapi.ai/introduction) | Reconnaissance vocale et NLP | [Lien](https://docs.vapi.ai/introduction) |
| [**ElevenLabs**](https://elevenlabs.io/docs/product/introduction) | Synthèse vocale avancée | [Lien](https://elevenlabs.io/docs/product/introduction) |
| [**Twilio Voice**](https://www.twilio.com/docs/voice) | Gestion des appels | [Lien](https://www.twilio.com/docs/voice) |
| [**Google Calendar API**](https://developers.google.com/calendar/api/quickstart/nodejs) | Gestion des réservations | [Lien](https://developers.google.com/calendar/api/quickstart/nodejs) |
| [**dotenv**](https://github.com/motdotla/dotenv) | Gestion des variables d'environnement | [Lien](https://github.com/motdotla/dotenv) |
| [**Redis**](https://redis.io/fr/) | Stockage en mémoire rapide | [Lien](https://redis.io/docs/latest/) |
| [**eslint**](https://eslint.org/) | Analyse de code | [Lien](https://eslint.org/) |
| [**prettier**](https://prettier.io/) | Formateur de code automatique | [Lien](https://prettier.io/) |
| [**husky**](https://github.com/typicode/husky) | Hooks Git | [Lien](https://github.com/typicode/husky) |
| [**class-validator**](https://github.com/typestack/class-validator) | Validation des DTOs | [Lien](https://github.com/typestack/class-validator) |
| [**GitHub Actions**](https://docs.github.com/en/actions) | CI/CD pour automatisation des tests et déploiements | [Lien](https://docs.github.com/en/actions) |


## 🏗️ Caractéristiques de l’infrastructure utilisée

- **Base de données** : MongoDB (locale ou MongoDB Atlas)
- **Serveur Node.js** : Fastify + TypeScript
- **Gestion des rôles et permissions** : JWT + Middleware + Schémas dédiés
- **Logs** : Pino (persisté dans un fichier local)
- **Tests** : Unitaires et intégration via Jest et Supertest
- **Conteneurisation** : Docker + Docker Compose
- **Documentation API** : Swagger UI exposé sur une route sécurisée
- **Redis** (cache et files d'attente en mémoire)
- **GitHub Actions** pour intégration continue (CI)
- **OpenAI + VAPI + ElevenLabs** pour modules IA
- **Twilio Voice** pour gestion téléphonique
- **Google Calendar** pour gestion des créneaux de réservation

## 🗂️ Structure du projet

```bash
── src/
│   ├── config/              # Configuration (env, logger, database)
│   ├── core/                # BaseEntity, Exceptions globales
│   ├── features/
│   │   ├── auth/             # Authentification
│   │   ├── company/          # Gestion des compagnies
│   │   ├── ai/               # IA intégrations (VAPI, OpenAI, ElevenLabs)
│   ├── infrastructure/
│   │   ├── mailer/           # Service d'envoi d'emails
│   │   ├── cache/            # Service Redis
│   ├── types/                # Typages additionnels Fastify, JWT...
│   ├── tests/                # Tests unitaires et d'intégration
│   │   ├── unit/
│   │   └── integration/
│   ├── routes.ts             # Définition centralisée des routes
│   └── server.ts             # Point d'entrée de l'application
├── .github/                  # Actions GitHub pour CI
├── .husky/                   # Hooks git pour lint-staged
├── docker/                   # Dockerfiles et scripts de déploiement
├── logs/                     # Stockage des logs applicatifs
├── .gitignore
├── .prettierrc
├── eslint.config.cjs
├── jest.config.js
├── lint-staged.config.js
├── tsconfig.json
├── package.json
├── docker-compose.yml
├── docker-compose.dev.yml
├── docker-compose.uat.yml
```

## ⚙️ Installation & Démarrage

### 🧪 Mode développement (via NPM)

```bash
# 1. Cloner le projet
git clone https://github.com/HKDIGITALS-DEV-TEAM/api-teleese.git
cd api-teleese

# 2. Installer les dépendances
npm install --legacy-peer-deps

# 3. Créer un fichier .env à partir du modèle
cp .env.example .env

# 4. Lancer le serveur (dev)
npm run dev
```

### 🐳 Mode conteneurisé (via Docker)

```bash
# 1. Cloner le projet
git clone https://github.com/HKDIGITALS-DEV-TEAM/api-teleese.git
cd api-teleese

# 2. Créer un fichier .env à partir du modèle
cp .env.example .env

# 3. Lancer les conteneurs (MongoDB + API)
docker-compose -f docker-compose.dev.yml up -d --build
```
#### L’API sera disponible sur http://localhost:9090


## 📘 Documentation Swagger

[Accès à la documentation interactive de l’API](http://localhost:9090/api/v1/docs)

## 📄 Licence

Ce projet est distribué sous la licence MIT. Voir LICENSE pour plus de détails.

## 👤 Contributeur

Développé avec ❤️ par [**HKDIGITALS**](https://hkdigitals.com). Pour toute amélioration, contribution ou demande de fonctionnalité, merci d’ouvrir un ticket ou une pull request.