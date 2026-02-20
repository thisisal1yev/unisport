-- ============================================================
-- UniSport — Supabase Schema
-- Run this in: Supabase Dashboard → SQL Editor
-- ============================================================

-- ============================================================
-- TABLES
-- ============================================================

-- Profiles (linked to auth.users)
CREATE TABLE IF NOT EXISTS profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  ism TEXT NOT NULL,
  familiya TEXT NOT NULL,
  telefon TEXT,
  tug_sana DATE,
  fakultet TEXT,
  guruh TEXT,
  vazn NUMERIC,
  boy NUMERIC,
  avatar_emoji TEXT DEFAULT '🧑',
  bio TEXT,
  sport_turlari TEXT[] DEFAULT '{}',
  is_admin BOOLEAN DEFAULT FALSE,
  ro_yxatdan_sana DATE DEFAULT CURRENT_DATE
);

-- Sport Locations
CREATE TABLE IF NOT EXISTS sport_joylari (
  id SERIAL PRIMARY KEY,
  nomi TEXT NOT NULL,
  manzil TEXT NOT NULL,
  kenglik NUMERIC NOT NULL,
  uzunlik NUMERIC NOT NULL,
  tuman TEXT NOT NULL,
  sport_turlari TEXT[] DEFAULT '{}',
  telefon TEXT,
  ish_vaqti TEXT,
  reyting NUMERIC DEFAULT 0
);

-- Competitions
CREATE TABLE IF NOT EXISTS musobaqalar (
  id SERIAL PRIMARY KEY,
  nomi TEXT NOT NULL,
  kategoriya TEXT NOT NULL,
  sana DATE NOT NULL,
  joy TEXT NOT NULL,
  ishtirokchilar_soni INT DEFAULT 0,
  maksimal_ishtirokchilar INT NOT NULL,
  holat TEXT CHECK (holat IN ('kelgusi', 'faol', 'yakunlangan')) DEFAULT 'kelgusi',
  rasm_emoji TEXT,
  tavsif TEXT,
  mukofotlar TEXT
);

-- Athletes (admin-managed)
CREATE TABLE IF NOT EXISTS sportchilar (
  id SERIAL PRIMARY KEY,
  ism TEXT NOT NULL,
  sport TEXT NOT NULL,
  fakultet TEXT,
  guruh TEXT,
  daraja TEXT CHECK (daraja IN ('Boshlovchi', 'Havaskor', 'Professional')) DEFAULT 'Boshlovchi',
  medallar INT DEFAULT 0,
  yulduzlar INT DEFAULT 0,
  avatar_emoji TEXT DEFAULT '🧑',
  telefon TEXT,
  tug_yil INT,
  bio TEXT,
  klub TEXT,
  klub_id INT
);

-- Clubs
CREATE TABLE IF NOT EXISTS klublar (
  id SERIAL PRIMARY KEY,
  nomi TEXT NOT NULL,
  tavsif TEXT,
  sport_turi TEXT NOT NULL,
  rasm_emoji TEXT,
  azolar_soni INT DEFAULT 0,
  lider JSONB
);

-- Achievements
CREATE TABLE IF NOT EXISTS yutuqlar (
  id SERIAL PRIMARY KEY,
  nomi TEXT NOT NULL,
  sportchi JSONB NOT NULL,
  musobaqa TEXT NOT NULL,
  medal_turi TEXT CHECK (medal_turi IN ('oltin', 'kumush', 'bronza')),
  medal_soni INT DEFAULT 1,
  sana DATE NOT NULL,
  rasm_emoji TEXT
);

-- News
CREATE TABLE IF NOT EXISTS yangiliklar (
  id SERIAL PRIMARY KEY,
  sarlavha TEXT NOT NULL,
  mazmun TEXT NOT NULL,
  kategoriya TEXT NOT NULL,
  rasm_emoji TEXT,
  sana DATE DEFAULT CURRENT_DATE,
  layklar INT DEFAULT 0,
  izohlar_soni INT DEFAULT 0
);

-- User-Club memberships (join table)
CREATE TABLE IF NOT EXISTS user_klublar (
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  klub_id INT REFERENCES klublar(id) ON DELETE CASCADE,
  PRIMARY KEY (user_id, klub_id)
);

-- User-Competition registrations (join table)
CREATE TABLE IF NOT EXISTS user_musobaqalar (
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  musobaqa_id INT REFERENCES musobaqalar(id) ON DELETE CASCADE,
  PRIMARY KEY (user_id, musobaqa_id)
);

-- ============================================================
-- ROW LEVEL SECURITY
-- ============================================================

ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE sport_joylari ENABLE ROW LEVEL SECURITY;
ALTER TABLE musobaqalar ENABLE ROW LEVEL SECURITY;
ALTER TABLE sportchilar ENABLE ROW LEVEL SECURITY;
ALTER TABLE klublar ENABLE ROW LEVEL SECURITY;
ALTER TABLE yutuqlar ENABLE ROW LEVEL SECURITY;
ALTER TABLE yangiliklar ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_klublar ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_musobaqalar ENABLE ROW LEVEL SECURITY;

-- Profiles: anyone can read, users can update/insert their own
CREATE POLICY "profiles_select" ON profiles FOR SELECT USING (true);
CREATE POLICY "profiles_insert" ON profiles FOR INSERT WITH CHECK (auth.uid() = id);
CREATE POLICY "profiles_update_own" ON profiles FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "profiles_update_admin" ON profiles FOR UPDATE
  USING (EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND is_admin = true));
CREATE POLICY "profiles_delete_admin" ON profiles FOR DELETE
  USING (EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND is_admin = true));

-- Public read for all content tables
CREATE POLICY "sport_joylari_select" ON sport_joylari FOR SELECT USING (true);
CREATE POLICY "musobaqalar_select" ON musobaqalar FOR SELECT USING (true);
CREATE POLICY "sportchilar_select" ON sportchilar FOR SELECT USING (true);
CREATE POLICY "klublar_select" ON klublar FOR SELECT USING (true);
CREATE POLICY "yutuqlar_select" ON yutuqlar FOR SELECT USING (true);
CREATE POLICY "yangiliklar_select" ON yangiliklar FOR SELECT USING (true);

-- Admin write for content tables
CREATE POLICY "sport_joylari_admin" ON sport_joylari FOR ALL
  USING (EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND is_admin = true));
CREATE POLICY "musobaqalar_admin" ON musobaqalar FOR ALL
  USING (EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND is_admin = true));
CREATE POLICY "sportchilar_admin" ON sportchilar FOR ALL
  USING (EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND is_admin = true));
CREATE POLICY "klublar_admin" ON klublar FOR ALL
  USING (EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND is_admin = true));
CREATE POLICY "yutuqlar_admin" ON yutuqlar FOR ALL
  USING (EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND is_admin = true));
-- Allow all authenticated users to update yangiliklar layklar
CREATE POLICY "yangiliklar_admin" ON yangiliklar FOR ALL
  USING (EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND is_admin = true));
CREATE POLICY "yangiliklar_like" ON yangiliklar FOR UPDATE
  USING (auth.uid() IS NOT NULL);

-- User memberships: users manage their own rows
CREATE POLICY "user_klublar_own" ON user_klublar FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "user_musobaqalar_own" ON user_musobaqalar FOR ALL USING (auth.uid() = user_id);

-- ============================================================
-- TRIGGER: auto-create profile on signup
-- ============================================================

CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO profiles (id, ism, familiya, avatar_emoji, sport_turlari)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'ism', ''),
    COALESCE(NEW.raw_user_meta_data->>'familiya', ''),
    COALESCE(NEW.raw_user_meta_data->>'avatar_emoji', '🧑'),
    '{}'
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION handle_new_user();

-- ============================================================
-- SEED DATA (from mock-data.ts)
-- ============================================================

INSERT INTO sport_joylari (id, nomi, manzil, kenglik, uzunlik, tuman, sport_turlari, telefon, ish_vaqti, reyting) VALUES
(1, 'Farg''ona Davlat Universiteti Stadioni', 'Farg''ona shahri, Mustaqillik ko''chasi 19', 40.3839, 71.7873, 'Farg''ona', ARRAY['Futbol','Yugurish'], '+998 73 244 0101', '06:00 - 22:00', 4.5),
(2, 'Sport Majmuasi ''Yoshlik''', 'Farg''ona shahri, Al-Farg''oniy ko''chasi 5', 40.3801, 71.791, 'Farg''ona', ARRAY['Basketbol','Voleybol','Tennis'], '+998 73 245 5555', '07:00 - 21:00', 4.8),
(3, 'Suzish Havzasi ''Delfin''', 'Marg''ilon shahri, Buyuk Ipak Yo''li ko''chasi 12', 40.4684, 71.7247, 'Marg''ilon', ARRAY['Suzish'], '+998 73 253 1234', '08:00 - 20:00', 4.2),
(4, 'Boks Maktabi', 'Farg''ona shahri, Navoiy ko''chasi 45', 40.3756, 71.7823, 'Farg''ona', ARRAY['Boks','Karate'], '+998 73 246 7890', '09:00 - 19:00', 4.6),
(5, 'Tennis Klubi ''Ace''', 'Quva tumani, Markaziy ko''cha 8', 40.5236, 72.0712, 'Quva', ARRAY['Tennis','Badminton'], '+998 73 354 4321', '07:00 - 20:00', 4.3)
ON CONFLICT (id) DO NOTHING;

SELECT setval('sport_joylari_id_seq', 5);

INSERT INTO musobaqalar (id, nomi, kategoriya, sana, joy, ishtirokchilar_soni, maksimal_ishtirokchilar, holat, rasm_emoji, tavsif, mukofotlar) VALUES
(1, 'Universitet Futbol Kubogi 2026', 'Futbol', '2026-03-15', 'Farg''ona Davlat Universiteti Stadioni', 24, 32, 'kelgusi', '⚽', 'Farg''ona viloyati universitetlari o''rtasidagi an''anaviy futbol musobaqasi', '1-o''rin: 5,000,000 so''m\n2-o''rin: 3,000,000 so''m\n3-o''rin: 1,500,000 so''m'),
(2, 'Basketbol Chempionati', 'Basketbol', '2026-02-20', 'Sport Majmuasi ''Yoshlik''', 16, 16, 'faol', '🏀', 'Talabalar o''rtasidagi basketbol chempionati', '1-o''rin: 3,000,000 so''m\n2-o''rin: 2,000,000 so''m'),
(3, 'Voleybol Turniri', 'Voleybol', '2026-01-10', 'Sport Majmuasi ''Yoshlik''', 12, 12, 'yakunlangan', '🏐', 'Qishki voleybol turniri', 'G''olib jamoaga sovg''alar'),
(4, 'Shaxmat Olimpiadasi', 'Shaxmat', '2026-04-05', 'FarDU Kutubxonasi', 8, 64, 'kelgusi', '♟️', 'Intellektual sport musobaqasi', NULL),
(5, 'Yugurish Marafoni', 'Yugurish', '2026-05-01', 'Farg''ona shahri markazi', 150, 500, 'kelgusi', '🏃', '5 km va 10 km masofalar', NULL)
ON CONFLICT (id) DO NOTHING;

SELECT setval('musobaqalar_id_seq', 5);

INSERT INTO sportchilar (id, ism, sport, fakultet, guruh, daraja, medallar, yulduzlar, avatar_emoji, telefon, tug_yil, bio, klub, klub_id) VALUES
(1, 'Islomov Sardor', 'Futbol', 'Axborot texnologiyalari', 'AT-21', 'Professional', 12, 5, '🧑‍🦱', '+998 90 123 4567', 2003, 'Jamoaning eng yaxshi hujumchisi', 'FarDU Futbol Klubi', 1),
(2, 'Karimova Dilnoza', 'Basketbol', 'Iqtisodiyot', 'IQ-22', 'Professional', 8, 4, '👩', '+998 91 234 5678', 2004, 'Ayollar jamoasining lideri', 'Basketbol Klubi', 2),
(3, 'Rahimov Aziz', 'Voleybol', 'Fizika-matematika', 'FM-20', 'Havaskor', 5, 3, '🧑', NULL, 2002, 'Voleybol jamoasi a''zosi', NULL, NULL),
(4, 'Toshmatov Bobur', 'Boks', 'Jismoniy tarbiya', 'JT-23', 'Professional', 15, 5, '💪', '+998 93 345 6789', 2001, 'Viloyat chempioni', 'Boks Klubi', 3),
(5, 'Sobirova Malika', 'Tennis', 'Xorijiy tillar', 'XT-21', 'Havaskor', 3, 3, '👧', NULL, 2003, 'Tennis bo''yicha iqtidorli sportchi', NULL, NULL),
(6, 'Qodirov Jahongir', 'Shaxmat', 'Matematika', 'M-22', 'Professional', 20, 5, '🤓', '+998 94 456 7890', 2002, 'Respublika shaxmat chempioni', NULL, NULL),
(7, 'Abdullayev Sherzod', 'Futbol', 'Axborot texnologiyalari', 'AT-22', 'Havaskor', 4, 3, '🧑‍🦰', NULL, 2004, NULL, 'FarDU Futbol Klubi', 1),
(8, 'Ergasheva Nodira', 'Suzish', 'Biologiya', 'B-21', 'Professional', 10, 4, '👱‍♀️', '+998 95 567 8901', 2003, 'Suzish bo''yicha viloyat rekordchisi', NULL, NULL)
ON CONFLICT (id) DO NOTHING;

SELECT setval('sportchilar_id_seq', 8);

INSERT INTO klublar (id, nomi, tavsif, sport_turi, rasm_emoji, azolar_soni, lider) VALUES
(1, 'FarDU Futbol Klubi', 'Farg''ona Davlat Universiteti rasmiy futbol klubi', 'Futbol', '⚽', 25, '{"id":1,"ism":"Islomov Sardor","sport":"Futbol","medallar":12,"yulduzlar":5}'),
(2, 'Basketbol Klubi', 'Talabalar basketbol jamoasi', 'Basketbol', '🏀', 18, '{"id":2,"ism":"Karimova Dilnoza","sport":"Basketbol","medallar":8,"yulduzlar":4}'),
(3, 'Boks Klubi', 'Professional bokschilar uchun klub', 'Boks', '🥊', 15, '{"id":4,"ism":"Toshmatov Bobur","sport":"Boks","medallar":15,"yulduzlar":5}'),
(4, 'Shaxmat Klubi', 'Aqliy sport ixlosmandlari uchun', 'Shaxmat', '♟️', 30, NULL),
(5, 'Voleybol Klubi', 'Erkaklar va ayollar voleybol jamoalari', 'Voleybol', '🏐', 20, NULL)
ON CONFLICT (id) DO NOTHING;

SELECT setval('klublar_id_seq', 5);

INSERT INTO yutuqlar (id, nomi, sportchi, musobaqa, medal_turi, medal_soni, sana, rasm_emoji) VALUES
(1, 'Viloyat chempioni', '{"id":1,"ism":"Islomov Sardor"}', 'Farg''ona viloyat futbol chempionati', 'oltin', 1, '2025-12-15', '🥇'),
(2, '2-o''rin', '{"id":2,"ism":"Karimova Dilnoza"}', 'Respublika basketbol kubogi', 'kumush', 1, '2025-11-20', '🥈'),
(3, 'Viloyat chempioni', '{"id":4,"ism":"Toshmatov Bobur"}', 'Boks bo''yicha viloyat chempionati', 'oltin', 1, '2025-10-10', '🥇'),
(4, 'Respublika chempioni', '{"id":6,"ism":"Qodirov Jahongir"}', 'O''zbekiston shaxmat chempionati', 'oltin', 1, '2025-09-05', '🥇'),
(5, '3-o''rin', '{"id":8,"ism":"Ergasheva Nodira"}', 'Suzish bo''yicha respublika musobaqasi', 'bronza', 1, '2025-08-25', '🥉')
ON CONFLICT (id) DO NOTHING;

SELECT setval('yutuqlar_id_seq', 5);

INSERT INTO yangiliklar (id, sarlavha, mazmun, kategoriya, rasm_emoji, sana, layklar, izohlar_soni) VALUES
(1, 'Futbol jamoasi viloyat chempionatida g''olib bo''ldi!', 'FarDU futbol jamoasi qattiq kurashlar davomida viloyat chempionatida birinchi o''rinni egalladi. Jamoa kapitani Islomov Sardor eng yaxshi futbolchi deb topildi. Musobaqa davomida jamoamiz 8 ta o''yin o''tkazib, barchasida g''alaba qozondi.', 'Futbol', '⚽', '2025-12-16', 45, 12),
(2, 'Yangi sport majmuasi qurilmoqda', 'Universitet hududida zamonaviy sport majmuasi qurilishi boshlandi. Majmua 2026-yil oxirigacha foydalanishga topshirilishi rejalashtirilgan. U yerda suzish havzasi, basketbol va voleybol maydonchalari bo''ladi.', 'Umumiy', '🏗️', '2025-12-10', 32, 8),
(3, 'Shaxmat bo''yicha trening boshlanmoqda', 'Yangi o''quv yili boshlanishi munosabati bilan shaxmat bo''yicha bepul treninglar e''lon qilinadi. Barcha darajadagi talabalar qatnashishi mumkin. Treninglar har hafta seshanba va payshanba kunlari o''tkaziladi.', 'Shaxmat', '♟️', '2025-12-05', 28, 5),
(4, 'Basketbol jamoasi yangi mavsumga tayyor', 'Universitetimiz basketbol jamoasi yangi mavsumga tayyorgarlik ko''rmoqda. Jamoaga yangi o''yinchilar qabul qilindi va intensiv mashg''ulotlar boshlandi.', 'Basketbol', '🏀', '2025-12-01', 19, 3)
ON CONFLICT (id) DO NOTHING;

SELECT setval('yangiliklar_id_seq', 4);

-- Sport Types
CREATE TABLE IF NOT EXISTS sport_turlari (
  id SERIAL PRIMARY KEY,
  nomi TEXT NOT NULL,
  tavsif TEXT,
  tarix TEXT,
  rasm_emoji TEXT DEFAULT '🏅',
  rasm TEXT,
  youtube_havola TEXT,
  asos_solingan TEXT,
  jamoa_hajmi TEXT,
  maydon_olchami TEXT,
  qoidalar TEXT,
  faktlar TEXT[] DEFAULT '{}'
);

ALTER TABLE sport_turlari ENABLE ROW LEVEL SECURITY;
CREATE POLICY "sport_turlari_select" ON sport_turlari FOR SELECT USING (true);
CREATE POLICY "sport_turlari_admin" ON sport_turlari FOR ALL
  USING (EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND is_admin = true));

INSERT INTO sport_turlari (id, nomi, tavsif, tarix, rasm_emoji, rasm, youtube_havola, asos_solingan, jamoa_hajmi, maydon_olchami, qoidalar, faktlar) VALUES
(1, 'Yengil atletika',
 'Yengil atletika — inson jismoniy imkoniyatlarini turli o''lchamlarda sinovdan o''tkazuvchi sport majmuasi. Bu sport sportchidan nafaqat tezlik va kuchni, balki texnik mukammallik, ruhiy chidamlilik va strategiyani talab qiladi.',
 'Yengil atletika qadimiy Olimpiya marosimlaridan tortib hozirgi zamon olimpiada va jahon chempionatlarigacha uzluksiz rivojlangan. XIX asr oxirida qoidalar standartlashib, xalqaro federatsiyalar tashkil etilib, shu bilan professional musobaqalar tizimi shakllandi.',
 '🏃', '/athletics.jpg', 'https://www.youtube.com/embed/ijYQjvzn7lE',
 'Yengil atletikaning asoslari qadimiy Yunoniston va boshqa qadimgi madaniyatlardan boshlanadi; zamonaviy qoidalar va struktura esa XIX asr oxiri — XX asr boshlarida shakllandi.',
 'Ko''pgina yengil atletika tadbirlari individual bo''lib, ba''zi hollarda jamoaviy formatlari mavjud.',
 'Yarim professional va professional stadionlardagi asosiy element — 400 metrlik trek.',
 'Har bir tur o''zining alohida me''yorlari bo''lib, umumiy printsip — adolat, aniqlik va xavfsizlik.',
 ARRAY['Usain Bolt 100 m uchun rasmiy rekordni 9.58 s bilan o''rnatgan.', 'Marafon masofasi (42.195 km) 1908-yilgi London Olimpiadasida standart holatini oldi.', 'Yengil atletika bir vaqtning o''zida sprint, chidamlilik va texnika sohalarini qamrab oladi.']),

(2, 'Badminton',
 'Badminton — yuqori refleks, aniqlik va strategiyani talab qiluvchi raketka sporti.',
 'Badminton juda tez rivojlangan va 20-asr davomida xalqaro miqyosda ommalashgan. 1992-yildan beri Olimpiya o''yinalarida rasmiy sport turi.',
 '🏸', '/badminton.webp', 'https://www.youtube.com/embed/n20IQaOMLZQ',
 'Zamonaviy badminton qoidalari 19-asr oxiri Angliyada shakllangan.',
 'Singl yoki juftlik rejimida o''tkaziladi.',
 'Rasmiy badminton korti 13.4 x 6.1 metr.',
 'O''yin 21 ochkogacha o''tkaziladi; har setda 2 ochko farq kerak.',
 ARRAY['Shuttlecockning uchish tezligi 400 km/soatga yaqinlashishi mumkin.', 'Badminton Janubi-Sharqiy Osiyo mamlakatlarida juda rivojlangan.']),

(3, 'Basketbol',
 'Basketbol — yuqori tempo, kreativ va strategik jamoaviy o''yin.',
 'Basketbol universitetlar va klub o''yinlari orqali tezlik bilan kengaydi; XX asr o''rtalarida professional ligalar paydo bo''ldi.',
 '🏀', '/basketball.jpeg', 'https://www.youtube.com/embed/3e7eb_BPI0U',
 'Basketbol 1891-yilda Jeyms Neysmit tomonidan ixtiro qilingan.',
 'Har jamoada maydonda 5 nafar o''yinchi bo''ladi.',
 'Standart basketbol maydoni 28 x 15 metr, halqa balandligi 3.05 m.',
 'To''pni halqaga tashlash orqali ochko olinadi: ichki zonadan 2, tashqi zonadan 3, penaltilardan 1 ochko.',
 ARRAY['Basketbol dastlab ichki sport sifatida yaratilgan.', 'NBA — professional basketbolning eng yuqori saviyasi.', 'Michael Jordan, LeBron James — basketbol tarixida yangi standartlar o''rnatgan.']),

(4, 'Voleybol',
 'Voleybol — muvofiqlik, timing va jamoaviy strategiyani talab qiluvchi dinamik o''yin.',
 'Voleybol yaratilgach tez ommalashdi; 1964-yildan beri Olimpiya o''yinlarida muntazam ishtirok etadi.',
 '🏐', '/volleyball.jpg', 'https://www.youtube.com/embed/_wYeFwzVhtI',
 'Voleybol 1895-yilda William G. Morgan tomonidan yaratilgan.',
 'Har jamoada 6 nafar o''yinchi, plyaj voleybolida 2 nafar.',
 'Voleybol maydoni 18 x 9 metr.',
 'Har set 25 ochko chegarasida yakunlanadi. Har jamoa maksimal 3 ta tegish bilan to''pni qaytarishi mumkin.',
 ARRAY['Plyaj voleyboli yozgi hamjamiyatlarda ommalashgan.', 'Blok va smash texnikalari tezlik va balandlikni birlashtiradi.']),

(5, 'Gandbol',
 'Gandbol — bu tezkor harakat, aniqlik va jamoaviy strategiyaning uyg''unligi.',
 'Gandbol 1920-yillarda xalqaro miqyosda rivojlandi. 1936-yilda ilk bor Olimpiya o''yinlariga kiritilgan.',
 '🤾', '/handball.jpg', 'https://www.youtube.com/embed/CTzdXigQVhM',
 'Gandbolning zamonaviy shakli 19-asr oxirida Germaniyada paydo bo''lgan.',
 'Har jamoada 7 nafar o''yinchi — 6 nafari maydonda va 1 nafari darvozabon.',
 'Standart gandbol maydoni 40 x 20 metr.',
 'Maqsad — to''pni raqib darvozasiga qo''l bilan kiritish. O''yin 2 taymdan iborat (har biri 30 daqiqa).',
 ARRAY['Zarba tezligi ba''zida 130 km/soatga yetadi.', 'Professional o''yinchilar bir o''yinda 6-8 kmgacha yugurishadi.']),

(6, 'Shaxmat',
 'Shaxmat — bu aql, sabr, strategiya va oldindan ko''ra bilish san''ati.',
 'XX asrda FIDE tuzilgan va rasmiy jahon chempionatlari yo''lga qo''yilgan. Onlayn shaxmatning rivoji tufayli bu o''yin butun dunyoda milliardlab o''yinchilarga ega.',
 '♟️', '/chess.jpg', 'https://www.youtube.com/embed/YH4ikaYPFD0',
 'Shaxmatning ildizlari milodiy VI asrda Hindistonda paydo bo''lgan ''Chaturanga'' o''yiniga borib taqaladi.',
 'Individual o''yin, jamoaviy turnirlar ham mavjud.',
 'Shaxmat doskasi 8x8 katakli (64 maydon).',
 'Maqsad — raqib shohini mat holatiga keltirish.',
 ARRAY['Eng uzoq shaxmat o''yini 269 yurishdan iborat bo''lgan.', 'Har bir o''yin boshida 10^120 dan ortiq mumkin bo''lgan kombinatsiyalar mavjud.', 'Magnus Carlsen 13 yoshida Grossmeyster bo''lgan.']),

(7, 'Xokkey (maydon xokkeyi)',
 'Maydon xokkeyi — bu tezlik, aniqlik va jamoaviy uyg''unlik san''ati.',
 'Xokkeyning xalqaro rivoji 20-asr boshlarida Hindiston va Pokiston jamoalari muvaffaqiyatlari bilan boshlanadi.',
 '🏑', '/xokkey.jpg', 'https://www.youtube.com/embed/V-0wFCcJI4I',
 'Zamonaviy shakli 19-asrda Angliyada rivojlanib, 1886-yilda rasmiy qoidalar bilan standartlashtirilgan.',
 'Har jamoada 11 nafar o''yinchi, ulardan biri darvozabon.',
 'Rasmiy maydon 91.4 x 55 metr.',
 'O''yin 70 daqiqa davom etadi (2 x 35 daqiqa). To''pni faqat tayoqning tekis yuzasi bilan urish mumkin.',
 ARRAY['Xokkeydagi to''p 160 km/soat tezlikda harakatlana oladi.', 'Hindiston erkaklar jamoasi 8 ta Olimpiya oltin medali bilan eng muvaffaqiyatli.']),

(8, 'Futbol',
 'Futbol — bu o''yindan ham ko''proq. U his, sadoqat va birlik timsoli.',
 'Futbol 19-asrda Angliyada yagona qoidalar bilan birlashtirildi. 1904-yilda FIFA tashkil topdi.',
 '⚽', '/football.jpg', 'https://www.youtube.com/embed/KWZNDmLwyWo',
 'Futbolning zamonaviy shakli 1863-yilda Angliyada Futbol Assotsiatsiyasi tashkil topgach rasmiylashtirilgan.',
 'Har bir jamoada 11 nafar o''yinchi: 10 maydon o''yinchisi va 1 darvozabon.',
 'Futbol maydoni odatda 105 x 68 metr.',
 'O''yin 90 daqiqa davom etadi (2 x 45). Ofsayd, penalti, burchak zarbalari va erkin zarbalar qoidalari mavjud.',
 ARRAY['Dunyo bo''yicha 4 milliarddan ortiq odam futbolni tomosha qiladi.', 'Braziliya 5 marta Jahon Chempioni — bu rekord.', 'Futbol 211 mamlakatda FIFA tomonidan boshqariladi.']),

(9, 'Regbi',
 'Regbi — kuch, jasorat, tezlik va jamoaviy ruhni talab qiluvchi sport turi.',
 'Regbi dastlab maktab sporti sifatida boshlangan, keyinchalik professional sportga aylangan.',
 '🏉', '/rugby.jpg', 'https://www.youtube.com/embed/3ErOGVHIybs',
 'Regbi 1823-yilda Angliyaning Rugby shahrida boshlangan.',
 'Har bir jamoada 15 nafar o''yinchi.',
 'Regbi maydoni odatda 100 x 70 metr.',
 'To''pni qo''l bilan faqat orqaga pas berish. Try 5 ochko, zarbalar 2 yoki 3 ochko beradi. O''yin 2 x 40 daqiqa.',
 ARRAY['O''yinchilar o''rtacha 7-8 km masofani yuqori tezlikda bosib o''tadi.', 'Rugby World Cup har to''rt yilda o''tkaziladi.']),

(10, 'Stol tennisi',
 'Stol tennisi — tezkorlik, aniqlik va strategiyani birlashtirgan sport turi.',
 'Xitoy, Yaponiya, Germaniya va Janubiy Koreya yetakchi davlatlar. 20-asr o''rtalarida Olimpiya sporti sifatida rasmiylashdi.',
 '🏓', '/tabletennis.avif', 'https://www.youtube.com/embed/a4vCTXg9fc0',
 'Stol tennisi XIX asr oxirida Angliyada ''ping-pong'' nomi bilan paydo bo''lgan. 1988-yildan beri Olimpiya dasturiga kiritilgan.',
 'Singl (1v1) yoki juftlik (2v2) tarzida o''ynaladi.',
 'Stol 2.74 metr uzunlikda va 1.525 metr kenglikda.',
 'Har bir set 11 ochko bilan o''ynaladi va 2 ochko farq bilan g''alaba qozoniladi.',
 ARRAY['Eng tez zarba 112 km/soat tezlikda qayd etilgan.', 'Xitoy sportchilari eng ko''p oltin medallarni qo''lga kiritgan.']),

(11, 'Suv polosi',
 'Suv polosi — bu suvda kuch, chidamlilik va aqlni birlashtirgan sport turi.',
 'Avstraliya, Vengriya, Italiya va AQSh jamoalari tarixda eng muvaffaqiyatli hisoblanadi.',
 '🤽', '/suv-polosi.jpg', 'https://www.youtube.com/embed/yxzud7JD67Y',
 'Suv polosi XIX asr oxirida Buyuk Britaniyada paydo bo''lgan. 1900-yildan boshlab Olimpiya o''yinlarining rasmiy qismi.',
 'Har bir jamoada 7 o''yinchi: 6 maydon o''yinchisi va 1 darvozabon.',
 'Suv havzasi odatda 25 x 20 metr, chuqurligi kamida 2 metr.',
 'O''yin 4 bo''limdan iborat, har biri 8 daqiqa davom etadi.',
 ARRAY['Sportchilar 3-4 soniya davomida suv ostida nafasni ushlab turishadi.', 'O''yin davomida o''yinchilar bir bo''limda 2-3 km suzishadi.']),

(12, 'Kurash',
 'Kurash — kuch, mahorat va taktika uyg''unligidan iborat sport turi.',
 'Kurash qadimdan inson jismoniy tayyorgarligi va strategiyasini rivojlantirgan. O''zbekiston milliy kurashi xalqaro maydonda tan olingan.',
 '🤼', '/kurash.jpg', 'https://www.youtube.com/embed/EBpF6ZUfVgE',
 'Kurash insoniyat tarixidagi eng qadimiy sport turlaridan biri. Miloddan avvalgi 708-yildan Olimpiya o''yinlarida mavjud.',
 'Individual sport turi, 1 ga 1 musobaqa.',
 'Gilam doirasi (diametri taxminan 9 metr).',
 'Raqibni gilamga tushirish, ushlab turish yoki texnik ustunlik orqali g''alaba qozoniladi.',
 ARRAY['O''zbekiston kurashchilari Olimpiya va Jahon chempionatlarida ko''plab medallarni qo''lga kiritgan.', 'Kurash sporti kuch, tezlik, strategiya va muvozanatni mukammal uyg''unlashtiradi.'])
ON CONFLICT (id) DO NOTHING;

SELECT setval('sport_turlari_id_seq', 12);
