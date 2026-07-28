# Purgo — Intelligent Developer Disk Manager

> **Reclaim your disk. Keep your sanity.**  
> Purgo scans your filesystem for build artifacts, caches, large files, and duplicate repos — and lets you clean them up safely, with full recovery support.

![Platform](https://img.shields.io/badge/platform-Windows-blue?style=flat-square)
![Electron](https://img.shields.io/badge/Electron-31-47848f?style=flat-square&logo=electron)
![React](https://img.shields.io/badge/React-18-61dafb?style=flat-square&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178c6?style=flat-square&logo=typescript)
![Version](https://img.shields.io/badge/version-1.0.0-22c55e?style=flat-square)

---

## What is Purgo?

Purgo is a native Windows desktop application built for software developers who accumulate gigabytes of recreatable build artifacts — `node_modules`, `target/`, `dist/`, `.next/`, Python virtualenvs, Gradle caches, Docker volumes, and more.

It scans your drives, discovers developer projects across **10+ ecosystems**, and presents a clean dashboard where you decide what goes. Nothing is ever deleted automatically. Every removal goes through a **30-day recoverable Purgo Trash** system, giving you a safety net at all times.

---

## Features

### 🗂️ Dashboard
A high-level overview of your disk health: total reclaimable space across all projects, top space consumers, ecosystem breakdown, Smart Insights recommendations, and quick-action shortcuts.

### 📊 Storage Analyzer
A WinDirStat-style interactive breakdown — drill from drive level → project group → project → individual artifact folder — with size proportions rendered visually.

### 🧹 Safe Artifacts
Discover recreatable build folders (`node_modules`, `dist`, `build`, `target`, `.next`, `__pycache__`, `.gradle`, `.dart_tool`, and more) across all scanned projects. Each artifact is rated:

| Badge | Meaning |
|---|---|
| ✅ **Safe** | Fully recreatable with a single command (e.g. `npm i`, `cargo build`) |
| 🔍 **Review** | Recreatable but may have local-only state (e.g. `venv`, `vendor`) |
| ⚠️ **Caution** | Inspect before removing (e.g. compiled `bin/`) |

### 📁 Large File Finder
Finds files over configurable size thresholds (100 MB, 500 MB, 1 GB, 5 GB+) anywhere under your scanned directories. Categorizes by extension and parent project.

### 🔁 Duplicate Detector
Identifies duplicate large files using size + MD5 header fingerprinting. Shows potential savings and lets you pick which copies to remove.

### 🌿 Git Repository Manager
Reads `.git/` metadata directly — no `git` CLI dependency required. Lists all discovered repositories with:
- Current branch & last commit date
- Remote URL (GitHub, GitLab, etc.)
- **Stale repo** detection (>60 days since last commit)
- Uncommitted changes indicator

### 💾 Ecosystem Cache Manager
Cleans global package manager and toolchain caches stored outside your projects:

| Ecosystem | Cache Location |
|---|---|
| npm | `%APPDATA%\npm-cache` |
| pnpm | `%LOCALAPPDATA%\pnpm\store` |
| Yarn | `%LOCALAPPDATA%\Yarn\Cache` |
| Cargo (Rust) | `%USERPROFILE%\.cargo\registry` |
| Gradle | `%USERPROFILE%\.gradle\caches` |
| Flutter / Dart | `%LOCALAPPDATA%\Pub\Cache` |
| Android Studio | `%USERPROFILE%\.android` |
| VS Code | Extensions & language server data |

### 🗑️ Purgo Trash
A built-in safety net — no item is permanently deleted without your explicit confirmation:
- Items are moved to Purgo Trash, not the Windows Recycle Bin
- **30-day retention** with configurable duration
- Original path preserved for one-click restore
- Individual or bulk restore / permanent delete
- Metadata tracking: item name, original path, size, deletion date

### 📈 Reports
Exportable scan reports with ecosystem summaries, artifact inventories, space reclaimed, and trash history.

### ⚙️ Settings
- Configurable scan root directories
- Scan depth limit (default: 6 levels)
- Hidden folder & system directory exclusion toggles
- Persistent ignore list (skip specific paths forever)
- Dark / Light theme toggle
- Trash retention period

---

## Supported Ecosystems

| Ecosystem | Detected By | Safe-to-Remove Artifacts |
|---|---|---|
| **Node.js / npm** | `package.json` | `node_modules`, `dist`, `build`, `.next`, `.nuxt`, `.cache`, `.vite`, `.parcel-cache`, `.svelte-kit`, `.angular`, `coverage` |
| **Rust / Cargo** | `Cargo.toml` | `target/` |
| **Go** | `go.mod` | `vendor/` |
| **Java / Maven** | `pom.xml` | `target/` |
| **Java / Gradle** | `build.gradle`, `build.gradle.kts` | `build/`, `.gradle/` |
| **Kotlin** | `build.gradle.kts` | `build/` |
| **Python** | `requirements.txt`, `pyproject.toml` | `__pycache__/`, `.pytest_cache/`, `venv/`, `.venv/` |
| **Flutter / Dart** | `pubspec.yaml` | `.dart_tool/` |
| **PHP / Composer** | `composer.json` | `vendor/` |
| **Unity** | `ProjectSettings/` | `Library/`, `Temp/` |
| **C# / C++** | — | `obj/`, `bin/` |

---

## Tech Stack

| Layer | Technology |
|---|---|
| UI Framework | React 18 + TypeScript |
| Desktop Shell | Electron 31 |
| Bundler | Vite 5 |
| Styling | Tailwind CSS 3 |
| State Management | Zustand |
| Icons | Lucide React |
| Build Tool | electron-builder |

---

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) 20 or later
- npm 10+

### Install Dependencies

```bash
npm install
```

### Run in Development (Browser Preview)

```bash
npm run dev
```

Opens the UI in your default browser via Vite's dev server. Electron IPC features (filesystem scanning, trash operations) are not available in this mode.

### Run as Electron App (Development)

```bash
npm run electron:dev
```

Builds the Electron main process, starts the Vite dev server, and launches the full desktop app with live reload.

### Build for Production

```bash
npm run electron:build
```

Produces a distributable Windows installer in the `dist/` folder via electron-builder.

---

## Project Structure

```
purgo/
├── electron/               # Electron main process (Node.js)
│   ├── main.ts             # App entry, window management, IPC handlers
│   ├── preload.ts          # Context bridge (renderer <-> main IPC)
│   ├── scanner.ts          # Filesystem scanner (projects, large files, duplicates)
│   ├── cacheScanner.ts     # Global ecosystem cache discovery
│   └── trashManager.ts     # Purgo Trash logic (move, restore, delete, retention)
│
├── src/                    # React renderer process
│   ├── components/
│   │   ├── layout/         # Titlebar, Sidebar, Header, StatusBar
│   │   ├── views/          # One component per dashboard section
│   │   └── common/         # Shared modals, overlays, buttons
│   ├── store/              # Zustand state stores (scan, trash, navigation, settings)
│   ├── services/           # Electron IPC bridge wrappers
│   └── types/              # Shared TypeScript type definitions
│
├── public/                 # Static assets
├── index.html              # Vite HTML entry point
├── vite.config.ts          # Renderer Vite config
├── vite.config.electron.ts # Main process Vite config
└── package.json
```

---

## Safety Principles

Purgo is built around a **non-destructive-first** philosophy:

1. **Zero automatic deletions** — every action requires explicit user confirmation.
2. **No immediate permanent wipes** — all standard deletes route through Purgo Trash.
3. **Full recovery** — every trashed item retains its original path and can be restored in one click.
4. **Confidence ratings** — artifacts are labeled Safe / Review / Caution before any action is offered.
5. **System directory protection** — Windows system folders, Program Files, and AppData\Temp are never scanned.

---

## Accessibility

- Full keyboard navigation throughout the app
- WCAG AA color contrast in both dark and light themes
- Screen-reader accessible data tables and modal dialogs
- Clear visible focus indicators on all interactive elements

---

## License

This project is private and not licensed for redistribution.
