export interface MenuItem {
  id: string;
  name: string;
  nameAr?: string;
  category: 'seafood_boil' | 'crispy' | 'sides' | 'drinks';
  price: number;
  description: string;
  descriptionAr?: string;
  emoji: string;
  image?: string;
  note?: string;
}

export interface Branch {
  id: string;
  name: string;
  address: string;
  phone: string;
  phoneDisplay: string;
}

export interface ReservationFormData {
  name: string;
  phone: string;
  guests: number;
  date: string;
  time: string;
  branch: string;
  requests: string;
}
