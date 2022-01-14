import { Salon } from 'models/admin.model';
import { Message } from 'types/util';
import { User } from 'models/user.model';

export type FetchAllUsersFavoritesReturn = Pick<
  Salon,
  '_id' | 'address' | 'name' | 'imageUrl' | 'city' | 'rating' | 'type'
>[];

export interface FetchAllUsersFavoritesResponse extends Message {
  favorites: FetchAllUsersFavoritesReturn;
}

export interface ChangePasswordArguments {
  oldPassword: string;
  newPassword: string;
}

export interface ChangeUserDataResponse extends Message {
  user: User;
}

export interface ChangeUserDataArguments {
  email?: string;
  fullname?: string;
  birthdata?: string;
  phone?: string;
  avatarUrl?: string;
}
