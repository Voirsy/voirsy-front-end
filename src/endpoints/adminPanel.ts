export const ADMIN_PANEL = {
  FETCH_SALONS: '/business/salons',
  FETCH_INFO: (salonId: string) => `/business/salon/${salonId}/info`,
  FETCH_SCHEDULE: (salonId: string) => `/business/salon/${salonId}/schedule`,
  FETCH_PORTFOLIO: (salonId: string) => `/business/salon/${salonId}/portfolio`,
};
