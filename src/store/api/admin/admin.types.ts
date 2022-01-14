import { Message } from 'types/util';
import { Salon } from 'models/admin.model';

export interface FetchAllSalonsReturn extends Message {
  salons: Pick<Salon, '_id' | 'address' | 'name' | 'city' | 'type'>[];
}

export type FetchSalonDataReturn = Pick<
  Salon,
  'name' | 'address' | 'phone' | 'description' | 'services' | 'crew' | 'city'
>;

export interface FetchSalonScheduleReturn extends Message {
  schedule: string;
}

export interface FetchSalonPortfolioReturn extends Message {
  portfolio: string[];
}

export interface FetchSalonPortfolioResponse extends Message {
  salon: Pick<Salon, 'name' | 'address' | 'phone' | 'description' | 'services' | 'crew' | 'city'>;
}
