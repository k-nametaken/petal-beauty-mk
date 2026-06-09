export interface SiteContent {
  heroSection: { headline: string; subheading: string; ctaText: string };
  announcement: { text: string; visible: boolean };
  aboutPage: { ownerName: string; ownerBio: string; yearsExperience?: number; mainText: string };
  contactDetails: { phone: string; email: string; address: string; googleMapsLink?: string };
  openingHours: Record<string, string>;
  services: Array<{ name: string; price: string; description?: string; category?: string; visible: boolean }>;
  reviews: Array<{ text: string; author: string; rating: number; date?: string; visible: boolean }>;
  teamMembers: Array<{ name: string; role?: string; bio?: string }>;
  certifications: Array<{ name: string; issuer?: string; year?: number }>;
  qualifications: Array<{ name: string; issuer?: string; year?: number }>;
  awards: Array<{ name: string; year?: number; description?: string }>;
  faqs: Array<{ question: string; answer: string; visible: boolean }>;
  galleryPhotos: Array<{ caption?: string; category?: string; imageUrl?: string }>;
  socialLinks: { instagram?: string; facebook?: string; tiktok?: string };
  seo: { metaTitle?: string; metaDescription?: string; keywords?: string };
}
