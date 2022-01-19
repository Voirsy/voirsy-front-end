import { Salon, Service } from 'models/admin.model';
import { Message } from 'types/util';

export type FetchSpecifiedSalonDataReturn = Omit<Salon, 'schedule'>;

export interface FetchSpecifiedSalonDataArguments {
  salonId: string;
}

export interface FetchSpecifiedSalonDataResponse extends Message {
  salon: Omit<Salon, 'schedule'>;
}

export interface FetchServiceArguments {
  salonId: string;
  serviceId: string;
}

export interface FetchServiceReturn extends Message {
  service: Service;
}

export interface AddReviewArguments {
  salonId: string;
  rating: number;
  opinion: string;
}

export interface GetFreeHoursArguments {
  salonId: string;
  serviceId: string;
  timeRange: {
    start: string;
    end: string;
  };
}

export interface GetFreeHoursReturn extends Message {
  freeHours: {
    workerId: string;
    startHours: string[];
  }[];
}

export interface ConfirmReservationArguments {
  salonId: string;
  serviceId: string;
  workerId: string;
  startHour: string;
}
