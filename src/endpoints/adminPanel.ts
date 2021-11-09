export const ADMIN_PANEL = {
  FETCH_SALONS: '/business/salons',
  FETCH_INFO: (salonId: string) => `/business/${salonId}/info`,
  FETCH_SCHEDULE: (salonId: string) => `/business/${salonId}/schedule`,
  FETCH_PORTFOLIO: (salonId: string) => `/business/${salonId}/portfolio`,
};
