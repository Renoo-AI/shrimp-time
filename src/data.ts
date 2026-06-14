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
    category: 'seafood_boil',
    price: 49,
    description: '12 crevettes + riz + salade',
    emoji: '🦐',
    image: '/crevettes-12.webp',
  },
  {
    id: 'sb2',
    name: 'Crevettes 6 Pièces',
    category: 'seafood_boil',
    price: 29,
    description: '6 crevettes + riz + salade',
    emoji: '🦐',
    image: unsplash('1625938146369-adc83368bda7'),
  },
  {
    id: 'sb3',
    name: 'Moules',
    category: 'seafood_boil',
    price: 25,
    description: 'Moules fraîches, portion généreuse',
    emoji: '🦪',
    image: unsplash('1565557623262-b51c2513a641'),
  },
  {
    id: 'sb4',
    name: 'Crabe',
    category: 'seafood_boil',
    price: 25,
    description: 'Crabe entier préparé',
    emoji: '🦀',
    image: unsplash('1559737558-2f5a35f4523b'),
  },
  {
    id: 'sb5',
    name: 'Mix Fruits de Mer (2 Pers.)',
    category: 'seafood_boil',
    price: 80,
    description: '8 crevettes, 2 crabes, 8 moules, 250g poulpe, 250g calamar',
    emoji: '🦞',
    image: unsplash('1615141982883-c7ad0e69fd62'),
  },
  {
    id: 'sb6',
    name: 'Langouste',
    category: 'seafood_boil',
    price: 120,
    description: 'Langouste grillée + riz + salade',
    emoji: '🦞',
    image: unsplash('1564093497595-593b96d80180'),
  },
  {
    id: 'sb7',
    name: 'Mix Fruits de Mer (4 Pers.)',
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
    category: 'crispy',
    price: 5,
    description: 'Frites dorées maison',
    emoji: '🍟',
    image: unsplash('1518013431117-eb1465fa5752'),
  },
  {
    id: 'cr2',
    name: 'Frites Cajun',
    category: 'crispy',
    price: 7,
    description: 'Frites assaisonnées au cajun épicé',
    emoji: '🍟',
    image: unsplash('1585109649139-366815a0d713'),
  },
  {
    id: 'cr3',
    name: 'Filet de Poulet',
    category: 'crispy',
    price: 15,
    description: 'Filet de poulet croustillant',
    emoji: '🍗',
    image: unsplash('1604503468506-a8da13d82791'),
  },
  {
    id: 'cr4',
    name: 'Fish & Chips Enfant',
    category: 'crispy',
    price: 17,
    description: 'Portion enfant — poisson pané + frites',
    emoji: '🐟',
    image: unsplash('1611599537845-1c7aca0091c0'),
  },
  {
    id: 'cr5',
    name: 'Calamars Frits',
    category: 'crispy',
    price: 23,
    description: 'Anneaux de calamar croustillants',
    emoji: '🦑',
    image: unsplash('1599487488170-d11ec9c172f0'),
  },
  {
    id: 'cr6',
    name: 'Crevettes Frites',
    category: 'crispy',
    price: 23,
    description: 'Crevettes croustillantes panées',
    emoji: '🦐',
    image: unsplash('1625938146369-adc83368bda7'),
  },
  {
    id: 'cr7',
    name: 'Fish & Chips Adulte',
    category: 'crispy',
    price: 28,
    description: 'Poisson pané, frites, sauce tartare',
    emoji: '🐟',
    image: unsplash('1611599537845-1c7aca0091c0'),
  },
  {
    id: 'cr8',
    name: 'Mix Friture Fruits de Mer',
    category: 'crispy',
    price: 35,
    description: 'Poisson, calamar, crevettes — trio croustillant',
    emoji: '🦑',
    image: unsplash('1599487488170-d11ec9c172f0'),
  },

  // ── Accompagnements (Side Dishes) ──
  {
    id: 'sd1',
    name: 'Sauce Tartare',
    category: 'sides',
    price: 2,
    description: 'Sauce tartare maison',
    emoji: '🥄',
  },
  {
    id: 'sd2',
    name: 'Sauce Dynamite',
    category: 'sides',
    price: 2,
    description: 'Sauce épicée signature',
    emoji: '🥄',
  },
  {
    id: 'sd3',
    name: 'Sauce Cajun',
    category: 'sides',
    price: 3,
    description: 'Sauce relevée au cajun',
    emoji: '🥄',
  },
  {
    id: 'sd4',
    name: 'Sauce Citron & Ail',
    category: 'sides',
    price: 3,
    description: 'Sauce fraîche citronnée à l\'ail',
    emoji: '🥄',
  },
  {
    id: 'sd5',
    name: 'Salade',
    category: 'sides',
    price: 3.5,
    description: 'Salade verte fraîche',
    emoji: '🥗',
  },
  {
    id: 'sd6',
    name: 'Riz',
    category: 'sides',
    price: 3.5,
    description: 'Riz blanc parfumé',
    emoji: '🍚',
  },
  {
    id: 'sd7',
    name: 'Soupe',
    category: 'sides',
    price: 12,
    description: 'Soupe de fruits de mer maison',
    emoji: '🍜',
    image: unsplash('1547592180-85f173990554'),
  },

  // ── Boissons (Drinks) ──
  {
    id: 'dr1',
    name: 'Eau Minérale',
    category: 'drinks',
    price: 1,
    description: 'Bouteille d\'eau minérale',
    emoji: '💧',
  },
  {
    id: 'dr2',
    name: 'Boissons Gazeuses',
    category: 'drinks',
    price: 3,
    description: 'Coca-Cola, Fanta, Sprite, etc.',
    emoji: '🥤',
  },
  {
    id: 'dr3',
    name: 'Jus de Citron',
    category: 'drinks',
    price: 3.5,
    description: 'Citronnade fraîche maison',
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
