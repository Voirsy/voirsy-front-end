// eslint-disable-next-line @typescript-eslint/no-explicit-any
import { minutesToHours } from 'date-fns';

export const isFilledArray = (array: any) => Array.isArray(array) && !!array.length;

export const calculateServiceDuration = (duration: number) => {
  const hours = minutesToHours(duration);
  let serviceDuration = '';
  if (hours !== 0) serviceDuration += `${hours}h`;
  serviceDuration += ` ${duration - hours * 60}min`;

  return serviceDuration;
};
