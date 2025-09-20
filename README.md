# MyProject

React + TypeScript + Vite + Firebase app using Mattilsynet Design System and Tiptap.

Live: https://lifehacker5882.github.io/myproject/

## Features

- Email/password auth (Firebase Auth)
- Rich text editor for posts (Tiptap)
- Feed (all posts), My Posts, badges and points
- Protected routes (only for authenticated users)
- Deployed to GitHub Pages with CI

## Tech stack

- React 19 + TypeScript + Vite 6
- React Router (HashRouter for GitHub Pages)
- Firebase (Auth, Firestore)
- Tiptap editor
- Mattilsynet Design System

## Prerequisites

- Node.js 18+ (22 recommended, matches CI)
- A Firebase project with Auth and Firestore enabled

## Setup (local)

1. Klon og installer

   ```cmd
   git clone https://github.com/lifehacker5882/myproject.git
   cd myproject
   npm install
   ```

2. Miljøvariabler

   - Kopier `.env.example` til `.env` og fyll inn verdier fra Firebase-prosjektet ditt.
   - Alle variabler må starte med `VITE_` for å bli eksponert til frontend ved byggetid.

   ```env
   VITE_FIREBASE_API_KEY=
   VITE_FIREBASE_AUTH_DOMAIN=
   VITE_FIREBASE_PROJECT_ID=
   VITE_FIREBASE_STORAGE_BUCKET=
   VITE_FIREBASE_MESSAGING_SENDER_ID=
   VITE_FIREBASE_APP_ID=
   VITE_FIREBASE_MEASUREMENT_ID=
   # Valgfritt (kun hvis Firebase App Check er pålagt):
   VITE_RECAPTCHA_V3_SITE_KEY=
   ```

3. Kjør utviklingsserver

   ```cmd
   npm run dev
   ```

   Åpne [http://localhost:5173](http://localhost:5173)

## Firebase-konfigurasjon

- Auth → Påloggingsmetode: aktiver E-post/Passord
- Auth → Autoriserte domener: legg til `localhost` og `lifehacker5882.github.io`
- Firestore → Regler (eksempel for offentlig lesing, autentisert skriving – tilpass etter behov):

  ```javascript
  service cloud.firestore {
    match /databases/{database}/documents {
      match /posts/{postId} {
        allow read: if true;
        allow write: if request.auth != null;
      }
    }
  }
  ```

- App Check (valgfritt, men anbefalt): hvis du pålegger App Check på Firestore/Auth, legg til en reCAPTCHA v3-leverandør og sett `VITE_RECAPTCHA_V3_SITE_KEY`.

## Ruting og basebane

- GitHub Pages serverer appen på `/myproject/`, så `vite.config.ts` er konfigurert med:

  ```ts
  export default defineConfig({ base: "/myproject/" });
  ```

- Appen bruker `HashRouter`, som er den enkleste oppsettet for GitHub Pages.

## Distribusjon (GitHub Pages)

Dette repoet inkluderer en arbeidsflyt på `.github/workflows/main.yml` som bygger og distribuerer ved hvert push til `main`:

- Sørg for at repository (eller miljø) hemmeligheter er satt for alle `VITE_FIREBASE_*` variabler (og eventuelt `VITE_RECAPTCHA_V3_SITE_KEY`).
- Hvis hemmelighetene er miljø-skopert, sett `environment: github-pages` på `build`-jobben også, slik at den kan få tilgang til disse hemmelighetene.
- Artefakten fra `dist/` publiseres via `actions/deploy-pages`.

## NPM-skript

- `npm run dev` – start utviklingsserver
- `npm run build` – typekontroll og bygg produksjonspakke
- `npm run preview` – forhåndsvis bygget app lokalt
- `npm run lint` – kjør ESLint

## Feilsøking

- Hvit/blank side på Pages:
  - Sørg for at `vite.config.ts` har `base: '/myproject/'`
  - Hard oppdatering (Ctrl+F5) og sjekk Konsoll/Nettside for 404 på ressurser
- “Context access might be invalid: VITE\_\*” i arbeidsflytredigereren:
  - En referert hemmelighet mangler eller er utenfor omfang; legg den til under Innstillinger → Hemmeligheter og variabler → Handlinger
  - Hvis du bruker miljø-skopte hemmeligheter, legg til `environment: github-pages` til `build`-jobben
- 403/CORS til Firestore (inkognito/andre nettlesere):
  - Hvis App Check er pålagt, må du konfigurere reCAPTCHA v3 og sette `VITE_RECAPTCHA_V3_SITE_KEY`
  - Autoriserte domener må inkludere `lifehacker5882.github.io`
- `npm ci` mislykkes i CI uten en låsefil:
  - Enten forplikt `package-lock.json` eller bytt til `npm install` i arbeidsflyten
- Feeden viser ingen innlegg:
  - Sjekk Firestore-regler og at `posts`-samlingen eksisterer med `createdAt`-feltet som brukes i sortering

## Merknader

- Brukergrensesnittet følger Mattilsynet Design Systems retningslinjer for typografi og farger. Prosjekt-spesifikk CSS fokuserer på layout, avstand og subtile effekter.
