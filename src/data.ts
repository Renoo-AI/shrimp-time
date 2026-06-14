import { MenuItem, Branch } from './types';

export const BRAND_COLORS = {
  navy: '#0A1F3F',
  yellow: '#F5D300',
  olive: '#8B9A3D',
  white: '#FFFFFF',
  light: '#F8F6F2',
  muted: '#6B7280',
  error: '#DC2626',
};

export const INSTAGRAM_URL = 'https://www.instagram.com/shrimp_.time/';
export const RESTAURANT_EMAIL = 'shrimptime270@gmail.com';

export const NAV_LINKS = [
  { id: 'hero', label: 'Accueil' },
  { id: 'menu', label: 'Menu' },
  { id: 'branches', label: 'Branches' },
  { id: 'reservation', label: 'Réservation' },
];

export const MENU_CATEGORIES = [
  { id: 'seafood_boil' as const, label: 'Fruits de Mer', arabicLabel: 'مأكولات بحرية' },
  { id: 'crispy' as const, label: 'Fritures', arabicLabel: 'أطباق مقلية' },
  { id: 'sides' as const, label: 'Accompagnements', arabicLabel: 'أطباق جانبية' },
  { id: 'drinks' as const, label: 'Boissons', arabicLabel: 'مشروبات' },
];

// Unsplash photo base URL builder
const unsplash = (id: string, w = 800) =>
  `https://images.unsplash.com/photo-${id}?w=${w}&q=80&auto=format&fit=crop`;

export const MENU_ITEMS: MenuItem[] = [
  // ── Fruits de Mer (Seafood Boil) ──
  {
    id: 'sb1',
    name: 'Crevettes 12 Pièces',
    nameAr: '12 جمبري + أرز + سلطة',
    category: 'seafood_boil',
    price: 49,
    description: '12 crevettes + riz + salade',
    emoji: '🦐',
    image: '/crevettes-12.webp',
  },
  {
    id: 'sb2',
    name: 'Crevettes 6 Pièces',
    nameAr: '6 جمبري + أرز + سلطة',
    category: 'seafood_boil',
    price: 29,
    description: '6 crevettes + riz + salade',
    emoji: '🦐',
    image: unsplash('1625938146369-adc83368bda7'),
  },
  {
    id: 'sb3',
    name: 'Moules',
    nameAr: 'بلح البحر (Mussels)',
    category: 'seafood_boil',
    price: 25,
    description: 'Moules fraîches, portion généreuse',
    emoji: '🦪',
    image: unsplash('1565557623262-b51c2513a641'),
  },
  {
    id: 'sb4',
    name: 'Crabe',
    nameAr: 'كراب (Crab)',
    category: 'seafood_boil',
    price: 25,
    description: 'Crabe entier préparé',
    emoji: '🦀',
    image: unsplash('1559737558-2f5a35f4523b'),
  },
  {
    id: 'sb5',
    name: 'Mix Fruits de Mer (2 Pers.)',
    nameAr: 'مزيج مأكولات بحرية (لشخصين)',
    category: 'seafood_boil',
    price: 80,
    description: '8 crevettes, 2 crabes, 8 moules, 250g poulpe, 250g calamar',
    emoji: '🦞',
    image: unsplash('1615141982883-c7ad0e69fd62'),
  },
  {
    id: 'sb6',
    name: 'Langouste',
    nameAr: 'لانجوست (Spiny Lobster)',
    category: 'seafood_boil',
    price: 120,
    description: 'Langouste grillée + riz + salade',
    emoji: '🦞',
    image: unsplash('1564093497595-593b96d80180'),
  },
  {
    id: 'sb7',
    name: 'Mix Fruits de Mer (4 Pers.)',
    nameAr: 'مزيج مأكولات بحرية (لأربعة أشخاص)',
    category: 'seafood_boil',
    price: 270,
    description: '1 kg de chaque : calamar, poulpe, crevettes, crabe, moules',
    emoji: '🦐',
    image: unsplash('1514933651103-005eec06c04b'),
  },

  // ── Fritures (Crispy Selection) ──
  {
    id: 'cr1',
    name: 'Frites',
    nameAr: 'بطاطا مقلية',
    category: 'crispy',
    price: 5,
    description: 'Frites dorées maison',
    descriptionAr: 'French fries',
    emoji: '🍟',
    image: unsplash('1518013431117-eb1465fa5752'),
  },
  {
    id: 'cr2',
    name: 'Frites Cajun',
    nameAr: 'بطاطا كاجون',
    category: 'crispy',
    price: 7,
    description: 'Frites assaisonnées au cajun épicé',
    descriptionAr: 'French fries + Cajun spice',
    emoji: '🍟',
    image: unsplash('1585109649139-366815a0d713'),
  },
  {
    id: 'cr3',
    name: 'Filet de Poulet',
    nameAr: 'فيليه دجاج',
    category: 'crispy',
    price: 15,
    description: 'Filet de poulet croustillant',
    descriptionAr: 'Grilled chicken + rice + veg',
    emoji: '🍗',
    image: unsplash('1604503468506-a8da13d82791'),
  },
  {
    id: 'cr4',
    name: 'Fish & Chips Enfant',
    nameAr: 'فيش أند تشيبس (للأطفال)',
    category: 'crispy',
    price: 17,
    description: 'Portion enfant — poisson pané + frites',
    descriptionAr: 'Kids portion — breaded fish + fries',
    emoji: '🐟',
    image: unsplash('1611599537845-1c7aca0091c0'),
  },
  {
    id: 'cr5',
    name: 'Calamars Frits',
    nameAr: 'كلامار',
    category: 'crispy',
    price: 23,
    description: 'Anneaux de calamar croustillants + tartare',
    descriptionAr: 'Crispy squid rings + tartare',
    emoji: '🦑',
    image: unsplash('1599487488170-d11ec9c172f0'),
  },
  {
    id: 'cr6',
    name: 'Crevettes Frites',
    nameAr: 'جمبري',
    category: 'crispy',
    price: 23,
    description: 'Crevettes croustillantes panées',
    descriptionAr: 'Crispy shrimp + sauce',
    emoji: '🦐',
    image: unsplash('1625938146369-adc83368bda7'),
  },
  {
    id: 'cr7',
    name: 'Fish & Chips Adulte',
    nameAr: 'فيش أند تشيبس (للبالغين)',
    category: 'crispy',
    price: 28,
    description: 'Poisson pané, frites, sauce tartare',
    descriptionAr: 'Breaded fish + fries + sauce',
    emoji: '🐟',
    image: unsplash('1611599537845-1c7aca0091c0'),
  },
  {
    id: 'cr8',
    name: 'Mix Friture Fruits de Mer',
    nameAr: 'مزيج مأكولات بحرية مقلية',
    category: 'crispy',
    price: 35,
    description: 'Poisson, calamar, crevettes — trio croustillant',
    descriptionAr: 'Calamari + shrimp + fish bites',
    emoji: '🦑',
    image: unsplash('1599487488170-d11ec9c172f0'),
  },

  // ── Accompagnements (Side Dishes) ──
  {
    id: 'sd1',
    name: 'Sauce Tartare',
    nameAr: 'صوص التارتار',
    category: 'sides',
    price: 2,
    description: 'Sauce tartare maison',
    descriptionAr: 'Homemade tartare sauce',
    emoji: '🥄',
  },
  {
    id: 'sd2',
    name: 'Sauce Dynamite',
    nameAr: 'صوص الديناميت',
    category: 'sides',
    price: 2,
    description: 'Sauce épicée signature',
    descriptionAr: 'Spicy signature sauce',
    emoji: '🥄',
  },
  {
    id: 'sd3',
    name: 'Sauce Cajun',
    nameAr: 'صوص الكاجون',
    category: 'sides',
    price: 3,
    description: 'Sauce relevée au cajun',
    descriptionAr: 'Cajun dipping sauce',
    emoji: '🥄',
  },
  {
    id: 'sd4',
    name: 'Sauce Citron & Ail',
    nameAr: 'صوص الليمون والثوم',
    category: 'sides',
    price: 3,
    description: 'Sauce fraîche citronnée à l\'ail',
    descriptionAr: 'Lemon garlic sauce',
    emoji: '🥄',
  },
  {
    id: 'sd5',
    name: 'Salade',
    nameAr: 'سلطة',
    category: 'sides',
    price: 3.5,
    description: 'Salade verte fraîche',
    descriptionAr: 'Fresh salad + vinaigrette',
    emoji: '🥗',
  },
  {
    id: 'sd6',
    name: 'Riz safrané',
    nameAr: 'أرز',
    category: 'sides',
    price: 3.5,
    description: 'Riz blanc parfumé',
    descriptionAr: 'Saffron rice',
    emoji: '🍚',
  },
  {
    id: 'sd7',
    name: 'Soupe de fruits de mer',
    nameAr: 'شوربة',
    category: 'sides',
    price: 12,
    description: 'Soupe de fruits de mer maison',
    descriptionAr: 'Mixed seafood broth',
    emoji: '🍜',
    image: unsplash('1547592180-85f173990554'),
  },

  // ── Boissons (Drinks) ──
  {
    id: 'dr1',
    name: 'Eau Minérale',
    nameAr: 'ماء معدني',
    category: 'drinks',
    price: 1,
    description: 'Bouteille d\'eau minérale 1L',
    descriptionAr: 'Mineral water 1L',
    emoji: '💧',
  },
  {
    id: 'dr2',
    name: 'Boissons Gazeuses',
    nameAr: 'مشروبات غازية',
    category: 'drinks',
    price: 3,
    description: 'Coca-Cola, Fanta, Sprite',
    descriptionAr: 'Soft can 330ml',
    emoji: '🥤',
  },
  {
    id: 'dr3',
    name: 'Jus de Citron',
    nameAr: 'عصير ليمون',
    category: 'drinks',
    price: 3.5,
    description: 'Citronnade fraîche maison',
    descriptionAr: 'Fresh lemon juice + mint',
    emoji: '🍋',
    image: unsplash('1621263764928-df1444c5e859'),
  },
];

export const MENU_NOTE = 'Sauces disponibles : Crème, Cajun, Citron & Ail.';

export const BRANCHES: Branch[] = [
  {
    id: 'marsa',
    name: 'La Marsa',
    address: 'La Marsa Plage, face à Zephyr',
    phone: '+21698900372',
    phoneDisplay: '98 900 372',
  },
  {
    id: 'aouina',
    name: "L'Aouina",
    address: 'Sous le Centre Médical Aïcha, Cité El Wahat',
    phone: '+21698900372',
    phoneDisplay: '98 900 372',
  },
];

export const TIME_SLOTS = [
  '12:00', '12:30', '13:00', '13:30', '14:00', '14:30',
  '19:00', '19:30', '20:00', '20:30', '21:00', '21:30', '22:00', '22:30',
];

export const RESTAURANT_HOURS = 'Mar–Dim · 12:00 – 23:30';

export const RESERVATION_FORM_INITIAL: {
  name: string;
  phone: string;
  guests: number;
  date: string;
  time: string;
  branch: string;
  requests: string;
} = {
  name: '',
  phone: '',
  guests: 2,
  date: '',
  time: '21:00',
  branch: 'marsa',
  requests: '',
};
