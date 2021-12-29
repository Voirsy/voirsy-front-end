import { SalonType } from 'enums/salonType.enum';

export type CrewMember = {
  _id: string;
  name: string;
  imageUrl: string;
};

export type Service = {
  _id: string;
  name: string;
  price: number;
  duration: number;
  description: string;
};

export type OpeningHour = {
  name: string;
  open: string;
  close: string;
};

export type Review = {
  name: string;
  date: string;
  rating: string;
  description: string;
  avatarUrl?: string;
  authorId: string;
};

export type Salon = {
  _id: string;
  name: string;
  address: string;
  city: string;
  phone: string;
  description: string;
  crew: CrewMember[];
  services: Service[];
  schedule: string;
  portfolio: string[];
  type: SalonType[];
  rating: string;
  imageUrl: string;
  openingHours: OpeningHour[];
  reviews: Review[];
};
