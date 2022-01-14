import { Salon } from 'models/admin.model';
import { Message } from 'types/util';
import { City } from '../../../models/city.model';

export interface FetchAllSalonArguments {
  location?: string;
  search?: string;
  sortBy?: string;
  salonType?: string[];
}

export interface FetchAllSalonsReturn extends Message {
  salons: Pick<Salon, '_id' | 'address' | 'name' | 'city' | 'type' | 'rating' | 'imageUrl'>[];
}

export interface FetchAllCitiesReturn extends Message {
  cities: City[];
}

export interface FetchAllCategoriesReturn extends Message {
  categories: City[];
}

export interface FavoritesArguments {
  salonId: string;
}
