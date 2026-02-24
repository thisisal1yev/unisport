# UniSport Scripts

## Setup

### 1. Environment Variables

Create `.env` file in the project root:

```bash
cp .env.example .env
```

Edit `.env` and add your Supabase credentials:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key-here
```

### 2. Create Database Schema

1. Go to [Supabase Dashboard](https://supabase.com/dashboard)
2. Select your project
3. Go to **SQL Editor**
4. Copy and paste the contents of `scripts/supabase-schema.sql`
5. Click **Run**

This creates all tables with:
- Auto-incrementing IDs (BIGSERIAL)
- `profiles` table for user roles (admin, coach, sportsman)
- Row Level Security (RLS) policies
- Indexes for performance
- Auto-trigger to create profiles on user signup

### 3. Seed Database

Populate the database with initial data and test users:

```bash
bun run db:seed
```

This inserts:
- **12 sport types** (Futbol, Basketbol, Voleybol, Tennis, Suzish, Yengil atletika, Kurash, Boks, etc.)
- **5 sport venues**
- **5 clubs**
- **5 competitions**
- **8 athletes**
- **4 news items**
- **5 achievements**
- **3 test users** (see credentials below)

## Test Users

After running the seed script, use these credentials to test:

| Role | Email | Password |
|------|-------|----------|
| Admin | `admin@unisport.uz` | `password123` |
| Coach | `coach@unisport.uz` | `password123` |
| Sportsman | `sportsman@unisport.uz` | `password123` |

## Commands

| Command | Description |
|---------|-------------|
| `bun run db:seed` | Seed database with initial data and test users |

## Database Tables

- `profiles` - User profiles with roles (admin, coach, sportsman)
- `sport_turlari` - Sports types
- `sport_joylari` - Sports venues
- `klublar` - Clubs
- `musobaqalar` - Competitions
- `sportchilar` - Athletes
- `yangiliklar` - News
- `yutuqlar` - Achievements
- `user_klublar` - User-Club memberships
- `user_musobaqalar` - User-Competition registrations

## Notes

- **IDs are auto-generated** by Supabase (BIGSERIAL or UUID)
- Seed script uses `SUPABASE_SERVICE_ROLE_KEY` to bypass RLS policies
- Safe to run seed multiple times (clears data before inserting)
- User roles are stored in `profiles.role` column
- **⚠️ Test users are for development only!** Delete them before production.
