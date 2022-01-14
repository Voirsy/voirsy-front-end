import { Salon } from 'models/admin.model';
import { Message } from 'types/util';

export type FetchSpecifiedSalonDataReturn = Omit<Salon, 'schedule'>;

export interface FetchSpecifiedSalonDataArguments {
  salonId: string;
}

export interface FetchSpecifiedSalonDataResponse extends Message {
  salon: Omit<Salon, 'schedule'>;
}

export interface AddReviewArguments {
  salonId: string;
  rating: number;
  opinion: string;
}
