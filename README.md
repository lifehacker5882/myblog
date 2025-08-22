# MyBlog

Dette er en enkel blogg-applikasjon bygget med React, TypeScript, Vite og Firebase.

## Funksjoner

- Registrer og logg inn med e-post og passord
- Skriv og publiser innlegg med rik tekst (Tiptap editor)
- Se alle innlegg i feeden
- Se dine egne innlegg under "My Posts"
- Poengsystem og nivåer
- Badges for oppnåelser

## Komme i gang

### Installasjon

1. Klon repoet:
   ```sh
   git clone https://github.com/<ditt-brukernavn>/myblog.git
   cd myblog
   ```

2. Installer avhengigheter:
   ```sh
   npm install
   ```

3. Opprett en `.env`-fil med dine Firebase-verdier:
   ```
   VITE_FIREBASE_API_KEY=...
   VITE_FIREBASE_AUTH_DOMAIN=...
   VITE_FIREBASE_PROJECT_ID=...
   VITE_FIREBASE_STORAGE_BUCKET=...
   VITE_FIREBASE_MESSAGING_SENDER_ID=...
   VITE_FIREBASE_APP_ID=...
   VITE_FIREBASE_MEASUREMENT_ID=...
   ```

### Kjør applikasjonen

```sh
npm run dev
```

Applikasjonen vil være tilgjengelig på [http://localhost:5173](http://localhost:5173).

## Bruk

- Naviger til "Login" for å registrere deg eller logge inn.
- Skriv nye innlegg under "My Posts".
- Se poeng og badges i navigasjonsmenyen.
- Logg ut med "Log Out"-knappen.

## Teknologi

- React + TypeScript
- Vite
- Firebase (Auth og Firestore)
- Tiptap Editor
