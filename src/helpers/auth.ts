export const isAuth = (): boolean => (!!localStorage.getItem('JWT_TOKEN') ? true : false);
