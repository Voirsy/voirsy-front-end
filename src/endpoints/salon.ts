export const SALON = {
  FETCH_SALON_DATA: (salonId: string) => `/salons/${salonId}`,
  FETCH_SERVICE: '/salons/service',
  ADD_REVIEW: '/salons/rating',
  GET_FREE_HOURS: '/salons/freehours',
  CONFIRM_RESERVATION: '/salons/reservation',
};
