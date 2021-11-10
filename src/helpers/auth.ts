export const isAuth = (): boolean => (!!localStorage.getItem('JWT_TOKEN') ? true : false);
export const logOut = (push: any) => {
  localStorage.removeItem('JWT_TOKEN');
  push('/');
};
