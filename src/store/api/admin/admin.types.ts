import { Message } from 'types/util';
import { Salon, CrewMember, Service, Appointment } from 'models/admin.model';

export interface FetchAllSalonsReturn extends Message {
  salons: Pick<Salon, '_id' | 'address' | 'name' | 'city' | 'type'>[];
}

export type FetchSalonDataReturn = Pick<
  Salon,
  'name' | 'address' | 'phone' | 'description' | 'services' | 'crew' | 'city' | 'email'
>;

export interface FetchSalonScheduleReturn extends Message {
  salon: Array<Appointment>;
}

export interface FetchSalonPortfolioReturn extends Message {
  portfolio: string[];
}

export interface FetchSalonPortfolioResponse extends Message {
  salon: Pick<Salon, 'name' | 'address' | 'phone' | 'description' | 'services' | 'crew' | 'city' | 'email'>;
}

export interface AddCrewMemberResponse extends Message {
  crew: CrewMember[];
}

export interface AddServiceResponse extends Message {
  services: Service[];
}

export interface AddServiceArguments {
  salonId: string;
  name: string;
  price: number;
  duration: number;
  description: string;
}

export interface UpdateSalonArguments {
  salonId: string;
  salon: Pick<Salon, 'name' | 'address' | 'phone' | 'description' | 'city' | 'email'>;
}

export type CreateSalonArguments = Omit<
  Salon,
  '_id' | 'portfolio' | 'schedule' | 'rating' | 'reviews' | 'phone' | 'email'
> & {
  owner: string | undefined;
  contact: {
    email: string;
    phone: string;
  };
};
