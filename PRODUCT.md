# Product

<!-- impeccable:product-schema 1 -->

## Platform

windows

## Users

Software developers (web, mobile, backend, systems, game dev) operating on Windows/cross-platform systems who accumulate large storage-consuming development artifacts (node_modules, target, build caches, Docker volumes, duplicate packages) and require a safe, transparent, and controllable disk cleanup manager.

## Product Purpose

Purgo is an intelligent **Developer Disk Manager** designed to discover safe-to-remove build artifacts, caches, and large dev files across the filesystem, organize them into an actionable dashboard, and empower developers to reclaim storage with absolute safety. Purgo enforces a strict non-destructive policy: zero automatic deletions, zero immediate permanent wipes, and full safety recoverability via an integrated 30-day Purgo Trash system.

## Positioning

Unlike generic aggressive disk scrubbers or cybernetic/sci-fi command line tools, Purgo is a clean, native-feeling Windows desktop application tailored specifically to software development ecosystems. It understands project structures (package.json, Cargo.toml, go.mod, build.gradle, etc.) and safe-to-remove recreatable folders (.next, node_modules, target, dist, build, caches), giving developers detailed safety scores, WinDirStat-style storage breakdowns, and total control over what is deleted and restored.

## Operating Context

Local desktop application running on Windows (built with Electron + React + TypeScript + Vite + Tailwind/CSS). Interacts directly with the Windows filesystem, process tools, Git, Docker, and package manager cache stores (npm, pnpm, yarn, bun, gradle, maven, cargo, pub, pip).

## Capabilities and Constraints

- **Capabilities**:
  - Ecosystem-aware project scanning (JS/TS, Python, Java, Rust, Go, Flutter, C#, C++, Unity, PHP).
  - Recreatable build artifact discovery with safety ratings (Safe, Review, Caution).
  - Purgo Trash System with 30-day retention, original path preservation, metadata tracking, individual & bulk restore, permanent deletion, and configurable retention.
  - Interactive WinDirStat-like Storage Analyzer with drill-down breakdown (Drive -> Project Group -> Project -> Folder -> Artifact).
  - Large File Finder (>100MB, >500MB, >1GB, >5GB).
  - Duplicate File & Repo Detector.
  - Git Repository Manager (identifies inactive/stale repos, branches, remote provider).
  - Ecosystem Cache Manager (Node, Java, Rust, Flutter, Android Studio, VS Code).
  - Docker Cleanup Manager (Images, Containers, Volumes, Networks, Builder Cache).
  - Dashboard analytics, Smart Insights recommendations, global search & filtering, bulk actions, persistent ignore lists, and exportable reports.
- **Constraints**:
  - Never delete automatically under any condition.
  - Never bypass Purgo Trash on standard delete actions.
  - No cybernetic, glowing sci-fi, terminal, or "AI slop" aesthetics—deliver a clean, typical Windows 11 Fluent desktop interface with clean dark/light mode, structured tables, clear visual hierarchy, and crisp typography.

## Brand Commitments

- **Name**: Purgo
- **Tagline**: Intelligent Developer Disk Manager
- **Design Language**: Clean Windows Desktop aesthetic. Native window frame feel, crisp typography, clean sidebar navigation, structured data density, subtle acrylic/glass accents, clear safety indicator badges, intuitive modals, and responsive controls.

## Evidence on Hand

Comprehensive vision specification provided in project prompt detailing exact functional requirements, trash lifecycle, supported project ecosystems, safe-to-remove directories, analytics screens, and safety principles.

## Product Principles

1. **Safety & Reversibility First**: Never delete automatically. Move all deleted items to Purgo Trash with 30-day safety retention and full restoration support.
2. **Developer-Ecosystem Intelligence**: Understand developer artifacts (node_modules, target, caches, Docker) and rate safety confidence before action.
3. **Total Transparency & Control**: Show exact file paths, sizes, safety ratings, and space reclaimed before and after any operation.
4. **Clean Native Windows Experience**: Provide a polished, fast, clutter-free desktop UI designed for productivity without flashy sci-fi or AI gimmicks.
5. **High Performance Scanning**: Utilize background workers for instant multi-drive directory traversing and non-blocking dashboard UI updates.

## Accessibility & Inclusion

Full keyboard navigation, WCAG AA compliant color contrast in both dark and light themes, screen-reader accessible data tables and modal dialogs, clear focus indicators, and customizable text scaling.
