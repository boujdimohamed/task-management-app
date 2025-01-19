# Aufgabenverwaltungs-App

Dies ist eine Aufgabenverwaltungs-App, die es Benutzern ermöglicht, Aufgaben hinzuzufügen, zu aktualisieren und zu löschen. Die App verwendet React für das Frontend und Axios für API-Anfragen.

## Voraussetzungen

Stellen Sie sicher, dass die folgenden Softwarekomponenten auf Ihrem System installiert sind:

- [Node.js](https://nodejs.org/) (einschließlich npm)
- Ein Paketmanager wie npm oder yarn

## Installation

1. Klonen Sie das Repository oder laden Sie den Quellcode herunter.
2. Navigieren Sie im Terminal oder in der Eingabeaufforderung zum Stammverzeichnis des Projekts.
cd pfad/zum/projekt
3. Installieren Sie die Abhängigkeiten:
   
  npm install
  
  npm run dev

when you something like that:
        > task-management-app@0.0.0 dev
        > vite
        
        Debugger attached.
        Port 5173 is in use, trying another one...
        
          VITE v6.0.7  ready in 343 ms
        
          ➜  Local:   http://localhost:5174/
          ➜  Network: use --host to expose
          ➜  press h + enter to show help

# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default tseslint.config({
  languageOptions: {
    // other options...
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
})
```

- Replace `tseslint.configs.recommended` to `tseslint.configs.recommendedTypeChecked` or `tseslint.configs.strictTypeChecked`
- Optionally add `...tseslint.configs.stylisticTypeChecked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and update the config:

```js
// eslint.config.js
import react from 'eslint-plugin-react'

export default tseslint.config({
  // Set the react version
  settings: { react: { version: '18.3' } },
  plugins: {
    // Add the react plugin
    react,
  },
  rules: {
    // other rules...
    // Enable its recommended rules
    ...react.configs.recommended.rules,
    ...react.configs['jsx-runtime'].rules,
  },
})
```
