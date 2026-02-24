# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

UniSport is a role-based sports management platform for Fergana State Technical University. Three user roles (admin, coach, sportsman) each have separate dashboards. The entire UI is localized in Uzbek.

## Commands

- `bun dev` — start dev server (binds to 0.0.0.0)
- `bun build` — production build
- `bun lint` — TypeScript type-check (`tsc --noEmit`) + ESLint
- `bun format` — format with Biome (`biome format --write`)

No test framework is configured.

## Architecture

**Next.js 15 with Pages Router** (not App Router). The `src/app/` directory only holds `globals.css`; all routing is under `src/pages/`.

**Routing & Access Control:**
- `src/middleware.ts` enforces role-based access using Supabase Auth. It reads `user_metadata.role` and restricts `/admin/*`, `/coach/*`, `/sportsman/*` to their respective roles.
- Public routes: `/`, `/auth`
- Authenticated users hitting `/auth` are redirected to their role dashboard.

**Layout Hierarchy** (`src/pages/_app.tsx`):
```
ThemeProvider (next-themes) → AppProvider (Context) → Role Layout → Page
```
Role layouts (`src/layouts/`) wrap a shared `BaseSidebar` component with role-specific nav items and accent colors.

**State Management:**
- `src/lib/store.tsx` — React Context (`AppProvider`) holds all app state: users, sports, competitions, clubs, achievements, news. Provides CRUD operations, auth functions, and participation actions (join/leave club/competition).
- Uses localStorage for `guruhlar` (groups) persistence under key `unisport_guruhlar`.
- Listens to Supabase `onAuthStateChange()` for session sync.

**Supabase Integration:**
- `src/lib/supabase/browser.ts` — browser client (used in components)
- `src/lib/supabase/server.ts` — server client (used in middleware, handles cookies)
- `src/lib/supabase/middleware.ts` — cookie helper for SSR auth

**Key Data Types** (`src/lib/types.ts`): `SportType`, `SportJoy` (venues), `Musobaqa` (competitions), `Sportchi` (athletes), `Klub`, `Yutuq` (achievements), `Yangilik` (news), `User`.

## Tech Stack

- **Runtime/Package Manager:** Bun
- **UI:** Tailwind CSS v4 (uses `@theme` in globals.css), shadcn/ui (Radix primitives), Framer Motion
- **Auth/DB:** Supabase (Auth + PostgreSQL)
- **Linting:** Biome (formatting) + ESLint (Next.js rules)
- **Path alias:** `@/*` → `src/*`

## Environment Variables

```
NEXT_PUBLIC_SUPABASE_URL
NEXT_PUBLIC_SUPABASE_ANON_KEY
SUPABASE_SERVICE_ROLE_KEY
```
