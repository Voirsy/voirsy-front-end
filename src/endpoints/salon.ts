export const SALON = {
  FETCH_SALON_DATA: (salonId: string) => `/salons/${salonId}`,
  FETCH_SERVICE: (salonId: string, serviceId: string) => `/salons/${salonId}/service/${serviceId}`,
  ADD_REVIEW: '/salons/rating',
};
