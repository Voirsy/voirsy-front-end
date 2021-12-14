import { SalonType } from 'enums/salonType.enum';

export interface SalonCardTypes {
  _id: string;
  imageUrl: string;
  rating: string;
  name: string;
  address: string;
  city: string;
  salonType: SalonType[];
}
