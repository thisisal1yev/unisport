# UniSport

A web platform for managing university sports life. Built for Fergana State Technical University.

## Tech Stack

- **Next.js 15** — React framework (Pages Router)
- **TypeScript** — type safety
- **Tailwind CSS 4** — styling
- **shadcn/ui + Radix UI** — UI components
- **Framer Motion** — animations
- **Supabase** — backend (database, authentication)
- **Bun** — package manager and runtime

## Getting Started

```bash
# Clone the repository
git clone https://github.com/S-T-Y-T/unisport1.git
cd unisport1

# Install dependencies
bun install

# Set up environment variables
cp .env.example .env
# Fill in your Supabase keys in .env

# Start the dev server
bun dev
```

The app will be available at http://localhost:3000.

## Environment Variables

| Variable | Description |
|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase anonymous key |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase service role key |

## Scripts

| Command | Description |
|---|---|
| `bun dev` | Dev server |
| `bun build` | Production build |
| `bun start` | Production server |
| `bun lint` | TypeScript + ESLint check |
| `bun format` | Format code with Biome |

## Project Structure

```
src/
├── app/
│   └── layout.tsx              # Root layout
├── components/
│   ├── landing/                # Landing page components
│   │   ├── Navbar.tsx
│   │   ├── HeroSection.tsx
│   │   ├── Features.tsx
│   │   ├── SportsTypes.tsx
│   │   ├── Competitions.tsx
│   │   ├── TopAthletes.tsx
│   │   ├── Clubs.tsx
│   │   ├── CTASection.tsx
│   │   └── Footer.tsx
│   └── ui/                     # shadcn/ui components
├── layouts/                    # Role-based layouts
│   ├── admin-layout.tsx
│   ├── coach-layout.tsx
│   └── sportsman-layout.tsx
├── pages/
│   ├── index.tsx               # Home page
│   ├── auth.tsx                # Authentication
│   ├── admin/                  # Admin panel
│   │   ├── dashboard.tsx
│   │   ├── sportchilar-manager.tsx
│   │   ├── musobaqalar-manager.tsx
│   │   ├── klublar-manager.tsx
│   │   ├── sport-joylari-manager.tsx
│   │   ├── yangiliklar.tsx
│   │   └── yutuqlar.tsx
│   ├── coach/                  # Coach panel
│   │   ├── dashboard.tsx
│   │   ├── sportchilar.tsx
│   │   ├── musobaqalar.tsx
│   │   └── ...
│   └── sportsman/              # Sportsman panel
│       ├── dashboard.tsx
│       ├── sport-turlari.tsx
│       ├── musobaqalar.tsx
│       └── ...
└── lib/
    ├── types.ts                # TypeScript types
    ├── store.tsx               # Global state (Context)
    ├── mock-data.ts            # Demo data
    ├── sports-data.ts          # Sports data
    ├── constants.ts            # Constants
    └── utils.ts                # Utility functions
```

## Roles

| Role | Capabilities |
|---|---|
| **Admin** | Manage athletes, competitions, clubs, sports venues, news, and achievements |
| **Coach** | Monitor athletes, view competitions, manage clubs |
| **Sportsman** | Browse sports, participate in competitions, edit profile |

## License

MIT
