# Aurum Dashboard

Aurum is a refined, modern finance dashboard for tracking, analyzing, and understanding personal or business wealth. It provides a clean visual workspace for balances, trends, and portfolio insights, with a design language that feels premium and focused.

## Why This Project
Managing money shouldn’t feel cluttered. Aurum is built to:
- simplify financial visibility
- highlight what matters at a glance
- provide a calm, professional interface for decision‑making

## What It Includes
- Responsive dashboard layout
- Theme toggle (light/dark)
- Role switcher UI (viewer/admin)
- Modular component structure
- Fast Vite + React + TypeScript stack

## Tech Stack
- Vite
- React
- TypeScript
- Tailwind CSS
- Radix UI (components)
- Zustand (state)

## How It Works
Aurum is a frontend dashboard built with React. The UI is composed of reusable layout and UI components, and state is handled with a lightweight store. The app runs locally with Vite, giving fast reloads and a smooth developer experience.

## Getting Started
### 0. Clone the repository
```bash
git clone <your-repo-url>
cd aurum-dashboard
```

### 1. Install dependencies
```bash
npm install
```

### 2. Run the development server
```bash
npm run dev
```

### 3. Build for production
```bash
npm run build
```

### 4. Preview the production build
```bash
npm run preview
```

## Contributing
We welcome improvements and refinements. To contribute:
1. Create a new branch for your work.
2. Make focused, well‑scoped changes.
3. Run lint/build before opening a pull request.

### Local development tips
- Keep UI changes small and testable.
- Follow the existing component and naming conventions.
- If you introduce new UI, prefer reusable components in `src/components/`.

## Project Structure
- `src/` – application source
- `src/components/` – UI and layout components
- `src/pages/` – route-level pages
- `public/` – static assets (logo, favicon)
- `index.html` – app metadata

## Branding
All branding uses the Aurum logo located in `public/aurum logo.jpeg`.

## Customization
To customize the product identity:
- Update metadata in `index.html`
- Replace logo in `public/`
- Adjust brand colors in Tailwind config

## License
This project is currently private and intended for internal or client use.
