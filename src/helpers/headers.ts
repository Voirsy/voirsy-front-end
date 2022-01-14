import { getToken } from './auth';

export const setAuthHeader = (headers: Headers) => {
  const token = `Bearer ${getToken()}`;

  if (token) headers.set('Authorization', token);

  return headers;
};
