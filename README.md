# Struct — System Design Visualizer

**Struct** is an interactive web tool for creating system architecture diagrams. Drag typed components onto an infinite canvas, connect them with arrows, configure properties, and export the result as PNG or SVG.

Built as a solo developer portfolio project.

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Vite + React 19 + TypeScript |
| Canvas | @xyflow/react (React Flow v12) |
| Layout | dagre |
| State | Zustand |
| Styling | Tailwind CSS v4 |
| Icons | lucide-react |
| Export | html-to-image (PNG / SVG) |
| Linting | ESLint + typescript-eslint (strict) |
| Tests | Vitest + @testing-library/react |

---

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) >= 18
- [pnpm](https://pnpm.io/) — the package manager used in this project

  ```bash
  npm install -g pnpm
  ```

### Install

```bash
pnpm install
```

### Run locally

```bash
pnpm dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## Available Commands

| Command | Description |
|---------|-------------|
| `pnpm dev` | Start development server (Vite) |
| `pnpm build` | TypeScript check + production build |
| `pnpm build:ci` | Lint + build (CI pipeline) |
| `pnpm lint` | Run ESLint (strict TypeScript rules) |
| `pnpm check` | Lint + build + tests (full CI) |
| `pnpm vitest run` | Run tests once |
| `pnpm preview` | Preview production build |

---

## Project Structure

```
src/
├── components/
│   ├── Canvas/          — React Flow canvas, context menu
│   ├── Export/          — PNG/SVG export utilities
│   ├── Palette/         — Draggable component palette
│   ├── Properties/      — Node/edge property editor
│   └── Toolbar/         — Auto Layout, Export, Share buttons
├── lib/
│   ├── autoLayout.ts    — Dagre auto-layout engine
│   └── __tests__/
├── nodes/               — 9 custom node components
├── store/
│   ├── useGraphStore    — Graph state + localStorage persistence
│   ├── useHistoryStore  — Undo/redo history
│   └── useUIStore       — UI preferences
├── types/               — Node and edge type definitions
├── App.tsx              — Main layout + keyboard shortcuts
└── main.tsx             — Entry point
```

## Features

- **9 node types** — Service, Database, Queue, API Gateway, Frontend, Storage, External, Auth, Cache
- **Dark theme** — carefully designed color scheme
- **Drag & drop** — from palette to canvas
- **Auto Layout** — one-click dagre-based arrangement
- **Export** — PNG and SVG
- **Undo/Redo** — Ctrl+Z / Ctrl+Shift+Z
- **localStorage** — automatic save and restore
- **Keyboard shortcuts** — Copy (Ctrl+C), Paste (Ctrl+V), Delete
- **Context menu** — right-click for Copy, Duplicate, Delete
- **Edge labels** — editable connection labels
- **Share by link** — encode graph in URL hash
- **Snap to grid** — 20px grid

## Linting

This project uses a strict TypeScript ESLint configuration:

```bash
pnpm lint
```

The config includes `recommendedTypeChecked`, `stylisticTypeChecked`, React Hooks rules, and additional custom rules for type safety.

## Tests

```bash
pnpm vitest run
```

Tests cover the graph store operations and the auto-layout engine.

## Deployment

The app is a static SPA. Build and deploy to any static host (Vercel, Netlify, GitHub Pages):

```bash
pnpm build
# Deploy the `dist/` folder
```
