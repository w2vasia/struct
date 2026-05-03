# Struct — System Design Visualizer

**Struct** is an interactive web tool for creating system architecture diagrams. Drag typed components onto an infinite canvas, connect them with arrows, configure properties, and export the result as PNG or SVG.

Built as a solo developer portfolio project.

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Vite + React 19 + TypeScript |
| Canvas | @xyflow/react (React Flow v12) |
| Edge rendering | Custom `StructEdge` with `EdgeLabelRenderer` |
| Layout | dagre |
| State | Zustand |
| Styling | Tailwind CSS v4 |
| Icons | lucide-react |
| Export | html-to-image (PNG / SVG) |
| Linting | ESLint + typescript-eslint (strict, type-aware) |
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
| `pnpm lint` | Run ESLint (strict, type-aware rules) |
| `pnpm check` | Lint + build + tests (full CI) |
| `pnpm vitest run` | Run tests once |
| `pnpm preview` | Preview production build |

---

## Project Structure

```
src/
├── components/
│   ├── Canvas/          — React Flow canvas, context menu (nodes + edges)
│   ├── Export/          — PNG/SVG export utilities
│   ├── Palette/         — Draggable component palette (9 node types)
│   ├── Properties/      — Node/edge property editor
│   └── Toolbar/         — Auto Layout, Export, Share buttons
├── edges/
│   ├── StructEdge.tsx   — Custom edge with label rendered on top (z-index: 1000)
│   └── index.ts         — Edge type registry
├── lib/
│   ├── autoLayout.ts    — Dagre auto-layout engine
│   └── __tests__/       — autoLayout tests
├── nodes/               — 9 custom node components (all typed)
├── store/
│   ├── useGraphStore    — Graph state + localStorage persistence
│   ├── useHistoryStore  — Undo/redo history (50 steps)
│   └── useUIStore       — UI preferences
├── test/
│   └── setup.ts         — Vitest + jest-dom setup
├── types/               — Node and edge type definitions
├── App.tsx              — Three-column layout + keyboard shortcuts
├── index.css            — Tailwind CSS v4 + dark theme variables
└── main.tsx             — Entry point
```

## Features

### Diagramming
- **9 node types** — Service, Database, Queue, API Gateway, Frontend, Storage, External, Auth, Cache
- **Drag & drop** — from palette to canvas
- **Edge connections** — drag from source handle to target handle, or click-to-connect
- **Edge labels** — editable labels rendered on top of edges (`z-index: 1000`)
- **Auto Layout** — one-click dagre-based arrangement
- **Snap to grid** — 20px grid

### Selection & Deletion
- **Click to select** — nodes and edges highlight with a cyan glow
- **Delete** — press `Delete` or `Backspace` on selected item
- **Context menu** — right-click on node (Copy, Duplicate, Delete) or edge (Delete)
- **Drag selection** — click-drag on empty canvas to select multiple items

### Undo / Redo
- **Ctrl+Z** — undo last action
- **Ctrl+Shift+Z** / **Ctrl+Y** — redo
- History stores up to 50 states

### Export & Sharing
- **Export PNG** — high-resolution (2x pixel ratio)
- **Export SVG** — vector format
- **Share by link** — encodes the entire graph in the URL hash

### Persistence
- **localStorage** — auto-saves on every change, restores on page load
- Deduplicates node IDs on load to prevent React key conflicts

### Properties Panel
- **Node properties** — edit label, description; view type
- **Edge properties** — edit label; view source/target node IDs

## Keyboard Shortcuts

| Shortcut | Action |
|----------|--------|
| `Delete` / `Backspace` | Delete selected node or edge |
| `Ctrl+Z` | Undo |
| `Ctrl+Shift+Z` / `Ctrl+Y` | Redo |
| `Ctrl+C` | Copy selected node |
| `Ctrl+V` | Paste copied node |

## Linting

This project uses a strict, type-aware TypeScript ESLint configuration:

```bash
pnpm lint
```

The config includes:
- `tseslint.configs.recommendedTypeChecked` — type-aware lint rules
- `tseslint.configs.stylisticTypeChecked` — stylistic type rules
- `eslint-plugin-react-hooks` — React Hooks rules (refs, dependencies)
- `eslint-plugin-react-refresh` — HMR-safe exports

Custom rules enforce no unused variables, consistent interface style, and no `any` types.

## Tests

```bash
pnpm vitest run
```

Tests cover:
- Graph store operations (`addNode`, `onConnect`, `removeSelected`, `updateNode`, `selectNode`)
- Auto-layout engine (position calculation, node count preservation, empty input handling)

## Color Scheme

| Type | Stroke | Fill |
|------|--------|------|
| Service | `#22d3ee` | `rgba(8, 51, 68, 0.4)` |
| Database | `#a78bfa` | `rgba(76, 29, 149, 0.4)` |
| Queue | `#fb923c` | `rgba(251, 146, 60, 0.15)` |
| API Gateway | `#34d399` | `rgba(6, 78, 59, 0.4)` |
| Frontend | `#fbbf24` | `rgba(120, 53, 15, 0.3)` |
| Storage | `#60a5fa` | `rgba(30, 58, 138, 0.4)` |
| External | `#94a3b8` | `rgba(30, 41, 59, 0.5)` |
| Auth | `#fb7185` | `rgba(136, 19, 55, 0.4)` |
| Cache | `#f472b6` | `rgba(131, 24, 67, 0.4)` |

## Deployment

The app is a static SPA. Build and deploy to any static host (Vercel, Netlify, GitHub Pages):

```bash
pnpm build
# Deploy the `dist/` folder
```

---

*Struct — design your architecture, one block at a time.*
