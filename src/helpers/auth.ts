/* eslint-disable @typescript-eslint/no-explicit-any */
export const isAuth = (): boolean => !!localStorage.getItem('JWT_TOKEN');
export const getToken = (): string => localStorage.getItem('JWT_TOKEN') || '';
export const logOut = (push: any) => {
  localStorage.removeItem('JWT_TOKEN');
  push('/');
};
