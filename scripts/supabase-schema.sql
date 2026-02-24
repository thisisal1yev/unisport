-- UniSport Supabase Database Schema
-- Run this in Supabase Dashboard → SQL Editor

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Profiles table (extends auth.users)
CREATE TABLE IF NOT EXISTS profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT,
  full_name TEXT,
  role TEXT DEFAULT 'sportsman', -- admin, coach, sportsman
  avatar_url TEXT,
  telefon TEXT,
  tug_yil INTEGER,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Add missing columns if they don't exist (for existing tables)
DO $$ 
BEGIN 
  -- Add role column
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'profiles' AND column_name = 'role'
  ) THEN
    ALTER TABLE profiles ADD COLUMN role TEXT DEFAULT 'sportsman';
  END IF;
  
  -- Add email column
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'profiles' AND column_name = 'email'
  ) THEN
    ALTER TABLE profiles ADD COLUMN email TEXT;
  END IF;
  
  -- Add full_name column
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'profiles' AND column_name = 'full_name'
  ) THEN
    ALTER TABLE profiles ADD COLUMN full_name TEXT;
  END IF;
  
  -- Add avatar_url column
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'profiles' AND column_name = 'avatar_url'
  ) THEN
    ALTER TABLE profiles ADD COLUMN avatar_url TEXT;
  END IF;
  
  -- Add telefon column
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'profiles' AND column_name = 'telefon'
  ) THEN
    ALTER TABLE profiles ADD COLUMN telefon TEXT;
  END IF;
  
  -- Add tug_yil column
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'profiles' AND column_name = 'tug_yil'
  ) THEN
    ALTER TABLE profiles ADD COLUMN tug_yil INTEGER;
  END IF;
  
  -- Add created_at column
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'profiles' AND column_name = 'created_at'
  ) THEN
    ALTER TABLE profiles ADD COLUMN created_at TIMESTAMPTZ DEFAULT NOW();
  END IF;
  
  -- Add updated_at column
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'profiles' AND column_name = 'updated_at'
  ) THEN
    ALTER TABLE profiles ADD COLUMN updated_at TIMESTAMPTZ DEFAULT NOW();
  END IF;
END $$;

-- Sport turlari (Sports types)
CREATE TABLE IF NOT EXISTS sport_turlari (
  id BIGSERIAL PRIMARY KEY,
  nomi TEXT NOT NULL,
  tavsif TEXT,
  tarix TEXT,
  rasm_emoji TEXT,
  rasm TEXT,
  youtube_havola TEXT,
  asos_solingan TEXT,
  jamoa_hajmi TEXT,
  maydon_olchami TEXT,
  qoidalar TEXT,
  faktlar TEXT[],
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Sport joylari (Sports venues)
CREATE TABLE IF NOT EXISTS sport_joylari (
  id BIGSERIAL PRIMARY KEY,
  nomi TEXT NOT NULL,
  manzil TEXT,
  kenglik DECIMAL(10, 8),
  uzunlik DECIMAL(11, 8),
  tuman TEXT,
  sport_turlari TEXT[],
  telefon TEXT,
  ish_vaqti TEXT,
  reyting DECIMAL(3, 2),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Klublar (Clubs)
CREATE TABLE IF NOT EXISTS klublar (
  id BIGSERIAL PRIMARY KEY,
  nomi TEXT NOT NULL,
  tavsif TEXT,
  sport_turi TEXT,
  rasm_emoji TEXT,
  azolar_soni INTEGER DEFAULT 0,
  lider JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Musobaqalar (Competitions)
CREATE TABLE IF NOT EXISTS musobaqalar (
  id BIGSERIAL PRIMARY KEY,
  nomi TEXT NOT NULL,
  kategoriya TEXT,
  sana DATE,
  joy TEXT,
  ishtirokchilar_soni INTEGER,
  maksimal_ishtirokchilar INTEGER,
  holat TEXT DEFAULT 'kelgusi',
  rasm_emoji TEXT,
  tavsif TEXT,
  mukofotlar TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Sportchilar (Athletes)
CREATE TABLE IF NOT EXISTS sportchilar (
  id BIGSERIAL PRIMARY KEY,
  ism TEXT NOT NULL,
  sport TEXT,
  fakultet TEXT,
  guruh TEXT,
  daraja TEXT DEFAULT 'Boshlovchi',
  medallar INTEGER DEFAULT 0,
  yulduzlar INTEGER DEFAULT 0,
  avatar_emoji TEXT,
  telefon TEXT,
  tug_yil INTEGER,
  bio TEXT,
  klub TEXT,
  klub_id BIGINT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Yangiliklar (News)
CREATE TABLE IF NOT EXISTS yangiliklar (
  id BIGSERIAL PRIMARY KEY,
  sarlavha TEXT NOT NULL,
  mazmun TEXT,
  kategoriya TEXT,
  rasm_emoji TEXT,
  sana DATE,
  layklar INTEGER DEFAULT 0,
  izohlar_soni INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- User klublar (User-Club memberships)
CREATE TABLE IF NOT EXISTS user_klublar (
  id BIGSERIAL PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  klub_id BIGINT REFERENCES klublar(id) ON DELETE CASCADE,
  qoshilgan_sana TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, klub_id)
);

-- User musobaqalar (User-Competition registrations)
CREATE TABLE IF NOT EXISTS user_musobaqalar (
  id BIGSERIAL PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  musobaqa_id BIGINT REFERENCES musobaqalar(id) ON DELETE CASCADE,
  royxatdan_otgan_sana TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, musobaqa_id)
);

-- Yutuqlar (Achievements)
CREATE TABLE IF NOT EXISTS yutuqlar (
  id BIGSERIAL PRIMARY KEY,
  nomi TEXT,
  sportchi JSONB,
  musobaqa TEXT,
  medal_turi TEXT,
  medal_soni INTEGER,
  sana DATE,
  rasm_emoji TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_klublar_sport_turi ON klublar(sport_turi);
CREATE INDEX IF NOT EXISTS idx_musobaqalar_kategoriya ON musobaqalar(kategoriya);
CREATE INDEX IF NOT EXISTS idx_musobaqalar_holat ON musobaqalar(holat);
CREATE INDEX IF NOT EXISTS idx_sportchilar_sport ON sportchilar(sport);
CREATE INDEX IF NOT EXISTS idx_sportchilar_daraja ON sportchilar(daraja);
CREATE INDEX IF NOT EXISTS idx_sportchilar_fakultet ON sportchilar(fakultet);
CREATE INDEX IF NOT EXISTS idx_yangiliklar_kategoriya ON yangiliklar(kategoriya);
CREATE INDEX IF NOT EXISTS idx_yangiliklar_sana ON yangiliklar(sana);
CREATE INDEX IF NOT EXISTS idx_user_klublar_user_id ON user_klublar(user_id);
CREATE INDEX IF NOT EXISTS idx_user_klublar_klub_id ON user_klublar(klub_id);
CREATE INDEX IF NOT EXISTS idx_user_musobaqalar_user_id ON user_musobaqalar(user_id);
CREATE INDEX IF NOT EXISTS idx_user_musobaqalar_musobaqa_id ON user_musobaqalar(musobaqa_id);
CREATE INDEX IF NOT EXISTS idx_yutuqlar_sana ON yutuqlar(sana);

-- Create indexes for profiles
CREATE INDEX IF NOT EXISTS idx_profiles_role ON profiles(role);
CREATE INDEX IF NOT EXISTS idx_profiles_email ON profiles(email);

-- Enable Row Level Security (RLS)
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE sport_turlari ENABLE ROW LEVEL SECURITY;
ALTER TABLE sport_joylari ENABLE ROW LEVEL SECURITY;
ALTER TABLE klublar ENABLE ROW LEVEL SECURITY;
ALTER TABLE musobaqalar ENABLE ROW LEVEL SECURITY;
ALTER TABLE sportchilar ENABLE ROW LEVEL SECURITY;
ALTER TABLE yangiliklar ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_klublar ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_musobaqalar ENABLE ROW LEVEL SECURITY;
ALTER TABLE yutuqlar ENABLE ROW LEVEL SECURITY;

-- Function to auto-create profile on user signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name, role)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', ''),
    COALESCE(NEW.raw_user_meta_data->>'role', 'sportsman')
  );
  RETURN NEW;
EXCEPTION
  WHEN OTHERS THEN
    -- Log error but don't fail user creation
    RAISE NOTICE 'Error creating profile: %', SQLERRM;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Drop trigger if exists and recreate
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;

-- Trigger on auth.users
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user();

-- Policies for profiles
CREATE POLICY "Public profiles are viewable by everyone" ON profiles FOR SELECT USING (true);
CREATE POLICY "Users can insert own profile" ON profiles FOR INSERT WITH CHECK (auth.uid() = id);
CREATE POLICY "Users can update own profile" ON profiles FOR UPDATE USING (auth.uid() = id);

-- Policies for public read access
CREATE POLICY "Public read access for sport_turlari" ON sport_turlari FOR SELECT USING (true);
CREATE POLICY "Public read access for sport_joylari" ON sport_joylari FOR SELECT USING (true);
CREATE POLICY "Public read access for klublar" ON klublar FOR SELECT USING (true);
CREATE POLICY "Public read access for musobaqalar" ON musobaqalar FOR SELECT USING (true);
CREATE POLICY "Public read access for sportchilar" ON sportchilar FOR SELECT USING (true);
CREATE POLICY "Public read access for yangiliklar" ON yangiliklar FOR SELECT USING (true);
CREATE POLICY "Public read access for yutuqlar" ON yutuqlar FOR SELECT USING (true);

-- Policies for user_klublar
CREATE POLICY "Users can view own klub memberships" ON user_klublar FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own klub memberships" ON user_klublar FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can delete own klub memberships" ON user_klublar FOR DELETE USING (auth.uid() = user_id);

-- Policies for user_musobaqalar
CREATE POLICY "Users can view own musobaqa registrations" ON user_musobaqalar FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own musobaqa registrations" ON user_musobaqalar FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can delete own musobaqa registrations" ON user_musobaqalar FOR DELETE USING (auth.uid() = user_id);

-- Policies for yutuqlar
CREATE POLICY "Users can view own yutuqlar" ON yutuqlar FOR SELECT USING (auth.uid() = (sportchi->>'id')::uuid);
CREATE POLICY "Service role can insert yutuqlar" ON yutuqlar FOR INSERT WITH CHECK (auth.jwt()->>'role' = 'service_role');

-- Grant public access to tables
GRANT ALL ON ALL TABLES IN SCHEMA public TO postgres;
GRANT ALL ON ALL SEQUENCES IN SCHEMA public TO postgres;
GRANT ALL ON ALL TABLES IN SCHEMA public TO authenticated;
GRANT ALL ON ALL SEQUENCES IN SCHEMA public TO authenticated;
