export const isAuth = (): boolean => (!!localStorage.getItem('JWT_TOKEN') ? true : false);
export const logOut = () => localStorage.removeItem('JWT_TOKEN');
