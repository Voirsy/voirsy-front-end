import { SalonType } from 'enums/salonType.enum';

export interface SalonCardTypes {
  imageUrl: string;
  rating: number;
  name: string;
  address: string;
  city: string;
  salonType: SalonType;
}
