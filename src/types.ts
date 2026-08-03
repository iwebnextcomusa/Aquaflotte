export interface ServiceItem {
  id: string;
  title: string;
  shortDesc: string;
  fullDesc: string;
  benefits: string[];
  iconName: string;
  category: string;
  image?: string;
  popular?: boolean;
}

export interface IndustryItem {
  id: string;
  name: string;
  description: string;
  iconName: string;
  vehiclesHandled: string[];
  image?: string;
}

export interface WhyChooseItem {
  id: string;
  title: string;
  description: string;
  iconName: string;
  stat?: string;
  statLabel?: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: 'all' | 'trucks' | 'heavy-equipment' | 'mobile-unit' | 'before-after';
  imageUrl: string;
  afterImageUrl?: string; // For before & after comparison
  description: string;
  location?: string;
}

export interface TestimonialItem {
  id: string;
  name: string;
  company: string;
  role: string;
  rating: number;
  review: string;
  fleetSize?: string;
  date?: string;
  avatarUrl?: string;
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
  category: 'general' | 'services' | 'pricing' | 'eco';
}

export interface QuoteFormState {
  name: string;
  company: string;
  email: string;
  phone: string;
  fleetTypes: string[];
  quantity: number;
  location: string;
  frequency: 'one-time' | 'weekly' | 'biweekly' | 'monthly';
  notes: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
}
