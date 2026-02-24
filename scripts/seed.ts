/**
 * UniSport - Supabase Seed Script
 *
 * Usage:
 *   bun run db:seed
 *
 * Requirements:
 *   - NEXT_PUBLIC_SUPABASE_URL
 *   - SUPABASE_SERVICE_ROLE_KEY
 */

import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('❌ Missing environment variables:');
  console.error('  NEXT_PUBLIC_SUPABASE_URL');
  console.error('  SUPABASE_SERVICE_ROLE_KEY');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

// Seed data
const sportTurlari = [
  {
    id: 1,
    nomi: 'Yengil atletika',
    tavsif: 'Yengil atletika — inson jismoniy imkoniyatlarini turli o\'lchamlarda sinovdan o\'tkazuvchi sport majmuasi.',
    tarix: 'Yengil atletika qadimiy Olimpiya marosimlaridan tortib hozirgi zamon olimpiada va jahon chempionatlarigacha uzluksiz rivojlangan.',
    rasm_emoji: '🏃',
    rasm: '/athletics.jpg',
    youtube_havola: 'https://www.youtube.com/embed/ijYQjvzn7lE',
    asos_solingan: 'Yengil atletikaning asoslari qadimiy Yunoniston va boshqa qadimgi madaniyatlardan boshlanadi.',
    jamoa_hajmi: 'Ko\'pgina yengil atletika tadbirlari individual bo\'lib, ba\'zi hollarda jamoaviy formatlari mavjud.',
    maydon_olchami: 'Yarim professional va professional stadionlardagi asosiy element — 400 metrlik trek.',
    qoidalar: 'Har bir tur o\'zining alohida me\'yorlari bo\'lib, umumiy printsip — adolat, aniqlik va xavfsizlik.',
    faktlar: ['Usain Bolt 100 m uchun rasmiy rekordni 9.58 s bilan o\'rnatgan.', 'Marafon masofasi (42.195 km) 1908-yilgi London Olimpiadasida standart holatini oldi.', 'Yengil atletika bir vaqtning o\'zida sprint, chidamlilik va texnika sohalarini qamrab oladi.'],
  },
  {
    id: 2,
    nomi: 'Badminton',
    tavsif: 'Badminton — yuqori refleks, aniqlik va strategiyani talab qiluvchi raketka sporti.',
    tarix: 'Badminton juda tez rivojlangan va 20-asr davomida xalqaro miqyosda ommalashgan. 1992-yildan beri Olimpiya o\'yinalarida rasmiy sport turi.',
    rasm_emoji: '🏸',
    rasm: '/badminton.webp',
    youtube_havola: 'https://www.youtube.com/embed/n20IQaOMLZQ',
    asos_solingan: 'Zamonaviy badminton qoidalari 19-asr oxiri Angliyada shakllangan.',
    jamoa_hajmi: 'Singl yoki juftlik rejimida o\'tkaziladi.',
    maydon_olchami: 'Rasmiy badminton korti 13.4 x 6.1 metr.',
    qoidalar: 'O\'yin 21 ochkogacha o\'tkaziladi; har setda 2 ochko farq kerak.',
    faktlar: ['Shuttlecockning uchish tezligi 400 km/soatga yaqinlashishi mumkin.', 'Badminton Janubi-Sharqiy Osiyo mamlakatlarida juda rivojlangan.'],
  },
  {
    id: 3,
    nomi: 'Basketbol',
    tavsif: 'Basketbol — yuqori tempo, kreativ va strategik jamoaviy o\'yin.',
    tarix: 'Basketbol universitetlar va klub o\'yinlari orqali tezlik bilan kengaydi; XX asr o\'rtalarida professional ligalar paydo bo\'ldi.',
    rasm_emoji: '🏀',
    rasm: '/basketball.jpeg',
    youtube_havola: 'https://www.youtube.com/embed/3e7eb_BPI0U',
    asos_solingan: 'Basketbol 1891-yilda Jeyms Neysmit tomonidan ixtiro qilingan.',
    jamoa_hajmi: 'Har jamoada maydonda 5 nafar o\'yinchi bo\'ladi.',
    maydon_olchami: 'Standart basketbol maydoni 28 x 15 metr, halqa balandligi 3.05 m.',
    qoidalar: 'To\'pni halqaga tashlash orqali ochko olinadi: ichki zonadan 2, tashqi zonadan 3, penaltilardan 1 ochko.',
    faktlar: ['Basketbol dastlab ichki sport sifatida yaratilgan.', 'NBA — professional basketbolning eng yuqori saviyasi.', 'Michael Jordan, LeBron James — basketbol tarixida yangi standartlar o\'rnatgan.'],
  },
  {
    id: 4,
    nomi: 'Voleybol',
    tavsif: 'Voleybol — muvofiqlik, timing va jamoaviy strategiyani talab qiluvchi dinamik o\'yin.',
    tarix: 'Voleybol yaratilgach tez ommalashdi; 1964-yildan beri Olimpiya o\'yinlarida muntazam ishtirok etadi.',
    rasm_emoji: '🏐',
    rasm: '/volleyball.jpg',
    youtube_havola: 'https://www.youtube.com/embed/_wYeFwzVhtI',
    asos_solingan: 'Voleybol 1895-yilda William G. Morgan tomonidan yaratilgan.',
    jamoa_hajmi: 'Har jamoada 6 nafar o\'yinchi, plyaj voleybolida 2 nafar.',
    maydon_olchami: 'Voleybol maydoni 18 x 9 metr.',
    qoidalar: 'Har set 25 ochko chegarasida yakunlanadi. Har jamoa maksimal 3 ta tegish bilan to\'pni qaytarishi mumkin.',
    faktlar: ['Plyaj voleyboli yozgi hamjamiyatlarda ommalashgan.', 'Blok va smash texnikalari tezlik va balandlikni birlashtiradi.'],
  },
  {
    id: 5,
    nomi: 'Gandbol',
    tavsif: 'Gandbol — bu tezkor harakat, aniqlik va jamoaviy strategiyaning uyg\'unligi.',
    tarix: 'Gandbol 1920-yillarda xalqaro miqyosda rivojlandi. 1936-yilda ilk bor Olimpiya o\'yinlariga kiritilgan.',
    rasm_emoji: '🤾',
    rasm: '/handball.jpg',
    youtube_havola: 'https://www.youtube.com/embed/CTzdXigQVhM',
    asos_solingan: 'Gandbolning zamonaviy shakli 19-asr oxirida Germaniyada paydo bo\'lgan.',
    jamoa_hajmi: 'Har jamoada 7 nafar o\'yinchi — 6 nafari maydonda va 1 nafari darvozabon.',
    maydon_olchami: 'Standart gandbol maydoni 40 x 20 metr.',
    qoidalar: 'Maqsad — to\'pni raqib darvozasiga qo\'l bilan kiritish. O\'yin 2 taymdan iborat (har biri 30 daqiqa).',
    faktlar: ['Zarba tezligi ba\'zida 130 km/soatga yetadi.', 'Professional o\'yinchilar bir o\'yinda 6-8 kmgacha yugurishadi.'],
  },
  {
    id: 6,
    nomi: 'Shaxmat',
    tavsif: 'Shaxmat — bu aql, sabr, strategiya va oldindan ko\'ra bilish san\'ati.',
    tarix: 'XX asrda FIDE tuzilgan va rasmiy jahon chempionatlari yo\'lga qo\'yilgan.',
    rasm_emoji: '♟️',
    rasm: '/chess.jpg',
    youtube_havola: 'https://www.youtube.com/embed/1zLCHqR0Gd8',
    asos_solingan: 'Shaxmat o\'yini qadimiy Hindistonda "Chaturanga" o\'yiniga borib taqaladi.',
    jamoa_hajmi: 'Individual o\'yin, jamoaviy turnirlar ham mavjud.',
    maydon_olchami: 'Shaxmat doskasi 8x8 katakli (64 maydon).',
    qoidalar: 'Maqsad — raqib shohini mat holatiga keltirish.',
    faktlar: ['Eng uzoq shaxmat o\'yini 269 yurishdan iborat bo\'lgan.', 'Har bir o\'yin boshida 10^120 dan ortiq mumkin bo\'lgan kombinatsiyalar mavjud.', 'Magnus Carlsen 13 yoshida Grossmeyster bo\'lgan.'],
  },
  {
    id: 7,
    nomi: 'Xokkey',
    tavsif: 'Maydon xokkeyi — bu tezlik, aniqlik va jamoaviy uyg\'unlik san\'ati.',
    tarix: 'Xokkeyning xalqaro rivoji 20-asr boshlarida Hindiston va Pokiston jamoalari muvaffaqiyatlari bilan boshlanadi.',
    rasm_emoji: '🏑',
    rasm: '/xokkey.jpg',
    youtube_havola: 'https://www.youtube.com/embed/V-0wFCcJI4I',
    asos_solingan: 'Zamonaviy shakli 19-asrda Angliyada rivojlanib, 1886-yilda rasmiy qoidalar bilan standartlashtirilgan.',
    jamoa_hajmi: 'Har jamoada 11 nafar o\'yinchi, ulardan biri darvozabon.',
    maydon_olchami: 'Rasmiy maydon 91.4 x 55 metr.',
    qoidalar: 'O\'yin 70 daqiqa davom etadi (2 x 35 daqiqa). To\'pni faqat tayoqning tekis yuzasi bilan urish mumkin.',
    faktlar: ['Xokkeydagi to\'p 160 km/soat tezlikda harakatlana oladi.', 'Hindiston erkaklar jamoasi 8 ta Olimpiya oltin medali bilan eng muvaffaqiyatli.'],
  },
  {
    id: 8,
    nomi: 'Futbol',
    tavsif: 'Futbol — bu o\'yindan ham ko\'proq. U his, sadoqat va birlik timsoli.',
    tarix: 'Futbol 19-asrda Angliyada yagona qoidalar bilan birlashtirildi. 1904-yilda FIFA tashkil topdi.',
    rasm_emoji: '⚽',
    rasm: '/football.jpg',
    youtube_havola: 'https://www.youtube.com/embed/KWZNDmLwyWo',
    asos_solingan: 'Futbolning zamonaviy shakli 1863-yilda Angliyada Futbol Assotsiatsiyasi tashkil topgach rasmiylashtirilgan.',
    jamoa_hajmi: 'Har bir jamoada 11 nafar o\'yinchi: 10 maydon o\'yinchisi va 1 darvozabon.',
    maydon_olchami: 'Futbol maydoni odatda 105 x 68 metr.',
    qoidalar: 'O\'yin 90 daqiqa davom etadi (2 x 45). Ofsayd, penalti, burchak zarbalari va erkin zarbalar qoidalari mavjud.',
    faktlar: ['Dunyo bo\'yicha 4 milliarddan ortiq odam futbolni tomosha qiladi.', 'Braziliya 5 marta Jahon Chempioni — bu rekord.', 'Futbol 211 mamlakatda FIFA tomonidan boshqariladi.'],
  },
  {
    id: 9,
    nomi: 'Regbi',
    tavsif: 'Regbi — kuch, jasorat, tezlik va jamoaviy ruhni talab qiluvchi sport turi.',
    tarix: 'Regbi dastlab maktab sporti sifatida boshlangan, keyinchalik professional sportga aylangan.',
    rasm_emoji: '🏉',
    rasm: '/rugby.jpg',
    youtube_havola: 'https://www.youtube.com/embed/3ErOGVHIybs',
    asos_solingan: 'Regbi 1823-yilda Angliyaning Rugby shahrida boshlangan.',
    jamoa_hajmi: 'Har bir jamoada 15 nafar o\'yinchi.',
    maydon_olchami: 'Regbi maydoni odatda 100 x 70 metr.',
    qoidalar: 'To\'pni qo\'l bilan faqat orqaga pas berish. Try 5 ochko, zarbalar 2 yoki 3 ochko beradi. O\'yin 2 x 40 daqiqa.',
    faktlar: ['O\'yinchilar o\'rtacha 7-8 km masofani yuqori tezlikda bosib o\'tadi.', 'Rugby World Cup har to\'rt yilda o\'tkaziladi.'],
  },
  {
    id: 10,
    nomi: 'Stol tennisi',
    tavsif: 'Stol tennisi — tezkorlik, aniqlik va strategiyani birlashtirgan sport turi.',
    tarix: 'Xitoy, Yaponiya, Germaniya va Janubiy Koreya yetakchi davlatlar. 20-asr o\'rtalarida Olimpiya sporti sifatida rasmiylashdi.',
    rasm_emoji: '🏓',
    rasm: '/tabletennis.avif',
    youtube_havola: 'https://www.youtube.com/embed/a4vCXg9fc0',
    asos_solingan: 'Stol tennisi XIX asr oxirida Angliyada \'ping-pong\' nomi bilan paydo bo\'lgan. 1988-yildan beri Olimpiya dasturiga kiritilgan.',
    jamoa_hajmi: 'Singl (1v1) yoki juftlik (2v2) tarzida o\'ynaladi.',
    maydon_olchami: 'Stol 2.74 metr uzunlikda va 1.525 metr kenglikda.',
    qoidalar: 'Har bir set 11 ochko bilan o\'ynaladi va 2 ochko farq bilan g\'alaba qozoniladi.',
    faktlar: ['Eng tez zarba 112 km/soat tezlikda qayd etilgan.', 'Xitoy sportchilari eng ko\'p oltin medallarni qo\'lga kiritgan.'],
  },
  {
    id: 11,
    nomi: 'Suv polosi',
    tavsif: 'Suv polosi — bu suvda kuch, chidamlilik va aqlni birlashtirgan sport turi.',
    tarix: 'Avstraliya, Vengriya, Italiya va AQSh jamoalari tarixda eng muvaffaqiyatli hisoblanadi.',
    rasm_emoji: '🤽',
    rasm: '/suv-polosi.jpg',
    youtube_havola: 'https://www.youtube.com/embed/yxzud7JD67Y',
    asos_solingan: 'Suv polosi XIX asr oxirida Buyuk Britaniyada paydo bo\'lgan. 1900-yildan boshlab Olimpiya o\'yinlarining rasmiy qismi.',
    jamoa_hajmi: 'Har bir jamoada 7 o\'yinchi: 6 maydon o\'yinchisi va 1 darvozabon.',
    maydon_olchami: 'Suv havzasi odatda 25 x 20 metr, chuqurligi kamida 2 metr.',
    qoidalar: 'O\'yin 4 bo\'limdan iborat, har biri 8 daqiqa davom etadi.',
    faktlar: ['Sportchilar 3-4 soniya davomida suv ostida nafasni ushlab turishadi.', 'O\'yin davomida o\'yinchilar bir bo\'limda 2-3 km suzishadi.'],
  },
  {
    id: 12,
    nomi: 'Kurash',
    tavsif: 'Kurash — kuch, mahorat va taktika uyg\'unligidan iborat sport turi.',
    tarix: 'Kurash qadimdan inson jismoniy tayyorgarligi va strategiyasini rivojlantirgan. O\'zbekiston milliy kurashi xalqaro maydonda tan olingan.',
    rasm_emoji: '🤼',
    rasm: '/kurash.jpg',
    youtube_havola: 'https://www.youtube.com/embed/EBpF6ZUfVgE',
    asos_solingan: 'Kurash insoniyat tarixidagi eng qadimiy sport turlaridan biri. Miloddan avvalgi 708-yildan Olimpiya o\'yinlarida mavjud.',
    jamoa_hajmi: 'Individual sport turi, 1 ga 1 musobaqa.',
    maydon_olchami: 'Gilam doirasi (diametri taxminan 9 metr).',
    qoidalar: 'Raqibni gilamga tushirish, ushlab turish yoki texnik ustunlik orqali g\'alaba qozoniladi.',
    faktlar: ['O\'zbekiston kurashchilari Olimpiya va Jahon chempionatlarida ko\'plab medallarni qo\'lga kiritgan.', 'Kurash sporti kuch, tezlik, strategiya va muvozanatni mukammal uyg\'unlashtiradi.'],
  },
];

const sportJoylari = [
  {
    id: 1,
    nomi: 'Farg\'ona Davlat Universiteti Stadioni',
    manzil: 'Farg\'ona shahri, Mustaqillik ko\'chasi 19',
    kenglik: 40.3839,
    uzunlik: 71.7873,
    tuman: 'Farg\'ona',
    sport_turlari: ['Futbol', 'Yugurish'],
    telefon: '+998 73 244 0101',
    ish_vaqti: '06:00 - 22:00',
    reyting: 4.5,
  },
  {
    id: 2,
    nomi: 'Sport Majmuasi \'Yoshlik\'',
    manzil: 'Farg\'ona shahri, Al-Farg\'oniy ko\'chasi 5',
    kenglik: 40.3801,
    uzunlik: 71.791,
    tuman: 'Farg\'ona',
    sport_turlari: ['Basketbol', 'Voleybol', 'Tennis'],
    telefon: '+998 73 245 5555',
    ish_vaqti: '07:00 - 21:00',
    reyting: 4.8,
  },
  {
    id: 3,
    nomi: 'Suzish Havzasi \'Delfin\'',
    manzil: 'Marg\'ilon shahri, Buyuk Ipak Yo\'li ko\'chasi 12',
    kenglik: 40.4684,
    uzunlik: 71.7247,
    tuman: 'Marg\'ilon',
    sport_turlari: ['Suzish'],
    telefon: '+998 73 253 1234',
    ish_vaqti: '08:00 - 20:00',
    reyting: 4.2,
  },
  {
    id: 4,
    nomi: 'Boks Maktabi',
    manzil: 'Farg\'ona shahri, Navoiy ko\'chasi 45',
    kenglik: 40.3756,
    uzunlik: 71.7823,
    tuman: 'Farg\'ona',
    sport_turlari: ['Boks', 'Karate'],
    telefon: '+998 73 246 7890',
    ish_vaqti: '09:00 - 19:00',
    reyting: 4.6,
  },
  {
    id: 5,
    nomi: 'Tennis Klubi \'Ace\'',
    manzil: 'Quva tumani, Markaziy ko\'cha 8',
    kenglik: 40.5236,
    uzunlik: 72.0712,
    tuman: 'Quva',
    sport_turlari: ['Tennis', 'Badminton'],
    telefon: '+998 73 354 4321',
    ish_vaqti: '07:00 - 20:00',
    reyting: 4.3,
  },
];

const klublar = [
  {
    id: 1,
    nomi: 'FarDU Futbol Klubi',
    tavsif: 'Farg\'ona Davlat Universiteti rasmiy futbol klubi',
    sport_turi: 'Futbol',
    rasm_emoji: '⚽',
    azolar_soni: 25,
    lider: { id: 1, ism: 'Islomov Sardor', sport: 'Futbol', medallar: 12, yulduzlar: 5 },
  },
  {
    id: 2,
    nomi: 'Basketbol Klubi',
    tavsif: 'Talabalar basketbol jamoasi',
    sport_turi: 'Basketbol',
    rasm_emoji: '🏀',
    azolar_soni: 18,
    lider: { id: 2, ism: 'Karimova Dilnoza', sport: 'Basketbol', medallar: 8, yulduzlar: 4 },
  },
  {
    id: 3,
    nomi: 'Boks Klubi',
    tavsif: 'Professional bokschilar uchun klub',
    sport_turi: 'Boks',
    rasm_emoji: '🥊',
    azolar_soni: 15,
    lider: { id: 4, ism: 'Toshmatov Bobur', sport: 'Boks', medallar: 15, yulduzlar: 5 },
  },
  {
    id: 4,
    nomi: 'Shaxmat Klubi',
    tavsif: 'Aqliy sport ixlosmandlari uchun',
    sport_turi: 'Shaxmat',
    rasm_emoji: '♟️',
    azolar_soni: 30,
    lider: null,
  },
  {
    id: 5,
    nomi: 'Voleybol Klubi',
    tavsif: 'Erkaklar va ayollar voleybol jamoalari',
    sport_turi: 'Voleybol',
    rasm_emoji: '🏐',
    azolar_soni: 20,
    lider: null,
  },
];

const musobaqalar = [
  {
    id: 1,
    nomi: 'Universitet Futbol Kubogi 2026',
    kategoriya: 'Futbol',
    sana: '2026-03-15',
    joy: 'Farg\'ona Davlat Universiteti Stadioni',
    ishtirokchilar_soni: 24,
    maksimal_ishtirokchilar: 32,
    holat: 'kelgusi',
    rasm_emoji: '⚽',
    tavsif: 'Farg\'ona viloyati universitetlari o\'rtasidagi an\'anaviy futbol musobaqasi',
    mukofotlar: '1-o\'rin: 5,000,000 so\'m\n2-o\'rin: 3,000,000 so\'m\n3-o\'rin: 1,500,000 so\'m',
    nizomUrl: '/nizomlar/futbol_kubogi_2026.pdf',
  },
  {
    id: 2,
    nomi: 'Basketbol Chempionati',
    kategoriya: 'Basketbol',
    sana: '2026-02-20',
    joy: 'Sport Majmuasi \'Yoshlik\'',
    ishtirokchilar_soni: 16,
    maksimal_ishtirokchilar: 16,
    holat: 'faol',
    rasm_emoji: '🏀',
    tavsif: 'Talabalar o\'rtasidagi basketbol chempionati',
    mukofotlar: '1-o\'rin: 3,000,000 so\'m\n2-o\'rin: 2,000,000 so\'m',
    nizomUrl: '/nizomlar/basketbol_chempionati.pdf',
  },
  {
    id: 3,
    nomi: 'Voleybol Turniri',
    kategoriya: 'Voleybol',
    sana: '2026-01-10',
    joy: 'Sport Majmuasi \'Yoshlik\'',
    ishtirokchilar_soni: 12,
    maksimal_ishtirokchilar: 12,
    holat: 'yakunlangan',
    rasm_emoji: '🏐',
    tavsif: 'Qishki voleybol turniri',
    mukofotlar: 'G\'olib jamoaga sovg\'alar',
    nizomUrl: null,
  },
  {
    id: 4,
    nomi: 'Shaxmat Olimpiadasi',
    kategoriya: 'Shaxmat',
    sana: '2026-04-05',
    joy: 'FarDU Kutubxonasi',
    ishtirokchilar_soni: 8,
    maksimal_ishtirokchilar: 64,
    holat: 'kelgusi',
    rasm_emoji: '♟️',
    tavsif: 'Intellektual sport musobaqasi',
    mukofotlar: null,
    nizomUrl: null,
  },
  {
    id: 5,
    nomi: 'Yugurish Marafoni',
    kategoriya: 'Yugurish',
    sana: '2026-05-01',
    joy: 'Farg\'ona shahri markazi',
    ishtirokchilar_soni: 150,
    maksimal_ishtirokchilar: 500,
    holat: 'kelgusi',
    rasm_emoji: '🏃',
    tavsif: '5 km va 10 km masofalar',
    mukofotlar: null,
    nizomUrl: null,
  },
];

const sportchilar = [
  {
    id: 1,
    ism: 'Islomov Sardor',
    sport: 'Futbol',
    fakultet: 'Axborot texnologiyalari',
    guruh: 'AT-21',
    daraja: 'Professional',
    medallar: 12,
    yulduzlar: 5,
    avatar_emoji: '🧑‍🦱',
    telefon: '+998 90 123 4567',
    tug_yil: 2003,
    bio: 'Jamoaning eng yaxshi hujumchisi',
    klub: 'FarDU Futbol Klubi',
    klub_id: 1,
  },
  {
    id: 2,
    ism: 'Karimova Dilnoza',
    sport: 'Basketbol',
    fakultet: 'Iqtisodiyot',
    guruh: 'IQ-22',
    daraja: 'Professional',
    medallar: 8,
    yulduzlar: 4,
    avatar_emoji: '👩',
    telefon: '+998 91 234 5678',
    tug_yil: 2004,
    bio: 'Ayollar jamoasining lideri',
    klub: 'Basketbol Klubi',
    klub_id: 2,
  },
  {
    id: 3,
    ism: 'Rahimov Aziz',
    sport: 'Voleybol',
    fakultet: 'Fizika-matematika',
    guruh: 'FM-20',
    daraja: 'Havaskor',
    medallar: 5,
    yulduzlar: 3,
    avatar_emoji: '🧑',
    telefon: null,
    tug_yil: 2002,
    bio: 'Voleybol jamoasi a\'zosi',
    klub: null,
    klub_id: null,
  },
  {
    id: 4,
    ism: 'Toshmatov Bobur',
    sport: 'Boks',
    fakultet: 'Jismoniy tarbiya',
    guruh: 'JT-23',
    daraja: 'Professional',
    medallar: 15,
    yulduzlar: 5,
    avatar_emoji: '💪',
    telefon: '+998 93 345 6789',
    tug_yil: 2001,
    bio: 'Viloyat chempioni',
    klub: 'Boks Klubi',
    klub_id: 3,
  },
  {
    id: 5,
    ism: 'Sobirova Malika',
    sport: 'Tennis',
    fakultet: 'Xorijiy tillar',
    guruh: 'XT-21',
    daraja: 'Havaskor',
    medallar: 3,
    yulduzlar: 3,
    avatar_emoji: '👧',
    telefon: null,
    tug_yil: 2003,
    bio: 'Tennis bo\'yicha iqtidorli sportchi',
    klub: null,
    klub_id: null,
  },
  {
    id: 6,
    ism: 'Qodirov Jahongir',
    sport: 'Shaxmat',
    fakultet: 'Matematika',
    guruh: 'M-22',
    daraja: 'Professional',
    medallar: 20,
    yulduzlar: 5,
    avatar_emoji: '🤓',
    telefon: '+998 94 456 7890',
    tug_yil: 2002,
    bio: 'Respublika shaxmat chempioni',
    klub: null,
    klub_id: null,
  },
  {
    id: 7,
    ism: 'Abdullayev Sherzod',
    sport: 'Futbol',
    fakultet: 'Axborot texnologiyalari',
    guruh: 'AT-22',
    daraja: 'Havaskor',
    medallar: 4,
    yulduzlar: 3,
    avatar_emoji: '🧑‍🦰',
    telefon: null,
    tug_yil: 2004,
    bio: null,
    klub: 'FarDU Futbol Klubi',
    klub_id: 1,
  },
  {
    id: 8,
    ism: 'Ergasheva Nodira',
    sport: 'Suzish',
    fakultet: 'Biologiya',
    guruh: 'B-21',
    daraja: 'Professional',
    medallar: 10,
    yulduzlar: 4,
    avatar_emoji: '👱‍♀️',
    telefon: '+998 95 567 8901',
    tug_yil: 2003,
    bio: 'Suzish bo\'yicha viloyat rekordchisi',
    klub: null,
    klub_id: null,
  },
];

const yangiliklar = [
  {
    id: 1,
    sarlavha: 'Futbol jamoasi viloyat chempionatida g\'olib bo\'ldi!',
    mazmun: 'FarDU futbol jamoasi qattiq kurashlar davomida viloyat chempionatida birinchi o\'rinni egalladi. Jamoa kapitani Islomov Sardor eng yaxshi futbolchi deb topildi. Musobaqa davomida jamoamiz 8 ta o\'yin o\'tkazib, barchasida g\'alaba qozondi.',
    kategoriya: 'Futbol',
    rasm_emoji: '⚽',
    sana: '2025-12-16',
    layklar: 45,
    izohlar_soni: 12,
  },
  {
    id: 2,
    sarlavha: 'Yangi sport majmuasi qurilmoqda',
    mazmun: 'Universitet hududida zamonaviy sport majmuasi qurilishi boshlandi. Majmua 2026-yil oxirigacha foydalanishga topshirilishi rejalashtirilgan. U yerda suzish havzasi, basketbol va voleybol maydonchalari bo\'ladi.',
    kategoriya: 'Umumiy',
    rasm_emoji: '🏗️',
    sana: '2025-12-10',
    layklar: 32,
    izohlar_soni: 8,
  },
  {
    id: 3,
    sarlavha: 'Shaxmat bo\'yicha trening boshlanmoqda',
    mazmun: 'Yangi o\'quv yili boshlanishi munosabati bilan shaxmat bo\'yicha bepul treninglar e\'lon qilinadi. Barcha darajadagi talabalar qatnashishi mumkin. Treninglar har hafta seshanba va payshanba kunlari o\'tkaziladi.',
    kategoriya: 'Shaxmat',
    rasm_emoji: '♟️',
    sana: '2025-12-05',
    layklar: 28,
    izohlar_soni: 5,
  },
  {
    id: 4,
    sarlavha: 'Basketbol jamoasi yangi mavsumga tayyor',
    mazmun: 'Universitetimiz basketbol jamoasi yangi mavsumga tayyorgarlik ko\'rmoqda. Jamoaga yangi o\'yinchilar qabul qilindi va intensiv mashg\'ulotlar boshlandi.',
    kategoriya: 'Basketbol',
    rasm_emoji: '🏀',
    sana: '2025-12-01',
    layklar: 19,
    izohlar_soni: 3,
  },
];

const yutuqlar = [
  {
    id: 1,
    nomi: 'Viloyat chempioni',
    sportchi: { id: 1, ism: 'Islomov Sardor' },
    musobaqa: 'Farg\'ona viloyat futbol chempionati',
    medal_turi: 'oltin',
    medal_soni: 1,
    sana: '2025-12-15',
    rasm_emoji: '🥇',
  },
  {
    id: 2,
    nomi: '2-o\'rin',
    sportchi: { id: 2, ism: 'Karimova Dilnoza' },
    musobaqa: 'Respublika basketbol kubogi',
    medal_turi: 'kumush',
    medal_soni: 1,
    sana: '2025-11-20',
    rasm_emoji: '🥈',
  },
  {
    id: 3,
    nomi: 'Viloyat chempioni',
    sportchi: { id: 4, ism: 'Toshmatov Bobur' },
    musobaqa: 'Boks bo\'yicha viloyat chempionati',
    medal_turi: 'oltin',
    medal_soni: 1,
    sana: '2025-10-10',
    rasm_emoji: '🥇',
  },
  {
    id: 4,
    nomi: 'Respublika chempioni',
    sportchi: { id: 6, ism: 'Qodirov Jahongir' },
    musobaqa: 'O\'zbekiston shaxmat chempionati',
    medal_turi: 'oltin',
    medal_soni: 1,
    sana: '2025-09-05',
    rasm_emoji: '🥇',
  },
  {
    id: 5,
    nomi: '3-o\'rin',
    sportchi: { id: 8, ism: 'Ergasheva Nodira' },
    musobaqa: 'Suzish bo\'yicha respublika musobaqasi',
    medal_turi: 'bronza',
    medal_soni: 1,
    sana: '2025-08-25',
    rasm_emoji: '🥉',
  },
];

// Test users (for development only)
// Password for all users: password123
// NOTE: User creation requires Supabase Auth API
const testUsers = [
  {
    email: 'admin@unisport.uz',
    password: 'password123',
    role: 'admin',
    full_name: 'Admin User',
  },
  {
    email: 'coach@unisport.uz',
    password: 'password123',
    role: 'coach',
    full_name: 'Coach User',
  },
  {
    email: 'sportsman@unisport.uz',
    password: 'password123',
    role: 'sportsman',
    full_name: 'Sportsman User',
  },
];

async function seed() {
  console.log('🌱 Starting UniSport seed...\n');

  // Clear existing data (in reverse dependency order)
  console.log('🗑️  Clearing existing data...');
  await supabase.from('user_musobaqalar').delete().neq('id', 0);
  await supabase.from('user_klublar').delete().neq('id', 0);
  await supabase.from('yutuqlar').delete().neq('id', 0);
  await supabase.from('yangiliklar').delete().neq('id', 0);
  await supabase.from('sportchilar').delete().neq('id', 0);
  await supabase.from('klublar').delete().neq('id', 0);
  await supabase.from('musobaqalar').delete().neq('id', 0);
  await supabase.from('sport_joylari').delete().neq('id', 0);
  await supabase.from('sport_turlari').delete().neq('id', 0);
  console.log('✅ Data cleared\n');

  // Insert sport_turlari
  console.log('📝 Inserting sport_turlari...');
  const { data: sportTypesData, error: sportTypesError } = await supabase
    .from('sport_turlari')
    .insert(sportTurlari)
    .select();
  if (sportTypesError) console.error('Error sport_turlari:', sportTypesError);
  else console.log(`  ✓ Inserted ${sportTypesData?.length} sport types\n`);

  // Insert sport_joylari
  console.log('📝 Inserting sport_joylari...');
  const { data: sportJoylariData, error: sportJoylariError } = await supabase
    .from('sport_joylari')
    .insert(sportJoylari)
    .select();
  if (sportJoylariError) console.error('Error sport_joylari:', sportJoylariError);
  else console.log(`  ✓ Inserted ${sportJoylariData?.length} sport venues\n`);

  // Insert klublar
  console.log('📝 Inserting klublar...');
  const { data: klublarData, error: klublarError } = await supabase
    .from('klublar')
    .insert(klublar)
    .select();
  if (klublarError) console.error('Error klublar:', klublarError);
  else console.log(`  ✓ Inserted ${klublarData?.length} clubs\n`);

  // Insert musobaqalar
  console.log('📝 Inserting musobaqalar...');
  const { data: musobaqalarData, error: musobaqalarError } = await supabase
    .from('musobaqalar')
    .insert(musobaqalar)
    .select();
  if (musobaqalarError) console.error('Error musobaqalar:', musobaqalarError);
  else console.log(`  ✓ Inserted ${musobaqalarData?.length} competitions\n`);

  // Insert sportchilar
  console.log('📝 Inserting sportchilar...');
  const { data: sportchilarData, error: sportchilarError } = await supabase
    .from('sportchilar')
    .insert(sportchilar)
    .select();
  if (sportchilarError) console.error('Error sportchilar:', sportchilarError);
  else console.log(`  ✓ Inserted ${sportchilarData?.length} athletes\n`);

  // Insert yangiliklar
  console.log('📝 Inserting yangiliklar...');
  const { data: yangiliklarData, error: yangiliklarError } = await supabase
    .from('yangiliklar')
    .insert(yangiliklar)
    .select();
  if (yangiliklarError) console.error('Error yangiliklar:', yangiliklarError);
  else console.log(`  ✓ Inserted ${yangiliklarData?.length} news items\n`);

  // Insert yutuqlar
  console.log('📝 Inserting yutuqlar...');
  const { data: yutuqlarData, error: yutuqlarError } = await supabase
    .from('yutuqlar')
    .insert(yutuqlar)
    .select();
  if (yutuqlarError) console.error('Error yutuqlar:', yutuqlarError);
  else console.log(`  ✓ Inserted ${yutuqlarData?.length} achievements\n`);

  // Create test users
  console.log('👤 Creating test users...');
  for (const user of testUsers) {
    try {
      // Try to delete existing user first (ignore errors)
      const existingUser = await supabase.auth.admin.getUserById(user.email as any);
      if (existingUser.data?.user) {
        await supabase.auth.admin.deleteUser(user.email);
      }
    } catch (e) {
      // User doesn't exist or other error - continue
    }
    
    const { data, error } = await supabase.auth.admin.createUser({
      email: user.email,
      password: user.password,
      email_confirm: true,
      user_metadata: {
        full_name: user.full_name,
        role: user.role,
      },
    });
    
    if (error) {
      console.error(`  ✗ Error creating ${user.email}:`, error.message);
    } else {
      console.log(`  ✓ Created ${user.role}: ${user.email} (ID: ${data.user.id})`);
      
      // Create/update profile manually
      const { error: profileError } = await supabase
        .from('profiles')
        .upsert({
          id: data.user.id,
          email: user.email,
          full_name: user.full_name,
          role: user.role,
        }, { onConflict: 'id' });
      
      if (profileError) {
        console.error(`    ⚠ Profile creation warning: ${profileError.message}`);
      }
    }
  }
  console.log('');

  console.log('✅ Seed completed successfully!\n');
}

seed();
