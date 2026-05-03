TXTEmperor
A lightweight cross-platform text editor and viewer built with Expo and React Native.
Edit, preview, save, and share TXT files on Android, iOS, and the web.

Table of Contents
- Prerequisites
- Getting the code
- Install dependencies
- Run the app
- Running on platforms
- How the app works (architecture)
- Project structure
- Features
- Known limitations
- Contributing
- License

Prerequisites
- Node.js (LTS recommended)
- npm (comes with Node) or yarn
- Expo CLI (optional; you can also use npx)
- For native builds: Android Studio (and an Android device or emulator) or macOS for iOS builds

Getting the code
- If you already have a local copy: skip to Install dependencies
- If you don’t have a local copy:
  - Clone the repository
    git clone <repo-url>
    cd TXTEmperor
  - Or download as ZIP and extract
- The project root contains an Expo/React Native app written in TypeScript

Install dependencies
```
npm install
```
Note: You may use yarn if you prefer: `yarn install`

Run the app
- Start dev server (Web, Android, iOS, and Expo Go)
```
npm start
```
This will start the Expo dev server and print a QR code. You can:
- Run on a physical device using the Expo Go app (Android or iOS) by scanning the QR code.
- Run on the web: open the URL printed in the terminal (expo web). You can also run `npm run web`.

- Run on Android native build (requires Android Studio):
```
npm run android
```
- Run on iOS native build (macOS required):
```
npm run ios
```

Project architecture (brief)
- The app uses Expo to provide a single JS/TS codebase that runs on Android, iOS, and web.
- Editor screen lets you type text, give the file a name, preview, and save/share the text as a .txt file using Expo File System and Sharing.
- Preview screen lets you load an existing TXT via the Document Picker, copy content to clipboard, or edit the file.
- State is managed in a small AppContext to share file content and filenames across screens.

Project structure (detailed)
- App.tsx: App wrapper and global providers
- index.ts: Expo entry point
- package.json: Project metadata and npm scripts
- tsconfig.json: TypeScript configuration (extends Expo TS config)
- src/
  - navigation/AppNavigator.tsx
  - screens/
    - HomeScreen.tsx
    - EditorScreen.tsx
    - PreviewScreen.tsx
  - components/
    - HeaderBar.tsx
    - ActionCard.tsx
    - PrimaryButton.tsx
  - hooks/
    - useFileOperations.ts
  - context/
    - AppContext.tsx
  - theme/
    - colors.ts
- assets/
  - favicon.png, splash-icon.png, etc.

Notes and caveats
- This project uses Expo and React Native with TypeScript. It’s designed for quick experimentation and small TXT editing tasks.
- Local file persistence uses Expo File System cacheDirectory; files are saved there and can be shared or opened via the Document Picker.
- No dedicated test suite is included in this repo; manual testing is recommended for initial validation.

Contributing
- Create a feature branch from main, implement changes, add tests if applicable, and open a PR.
- Please run the project locally to verify changes before pushing.
