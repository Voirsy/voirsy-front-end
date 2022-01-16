// eslint-disable-next-line @typescript-eslint/no-explicit-any
import { minutesToHours } from 'date-fns';
import { GetFreeHoursReturn } from 'store/api/salon/salon.types';

export const isFilledArray = (array: any) => Array.isArray(array) && !!array.length;

export const calculateServiceDuration = (duration: number) => {
  const hours = minutesToHours(duration);
  let serviceDuration = '';
  if (hours !== 0) serviceDuration += `${hours}h`;
  serviceDuration += ` ${duration - hours * 60}min`;

  return serviceDuration;
};

export const sortByDate = (dates: string[]) => dates.sort((a, b) => new Date(a).getTime() - new Date(b).getTime());

export const splitToDays = (dates: string[]) => {
  const datesToReturn = [[dates[0]]];
  let k = 0;

  for (let i = 1; i < dates.length; i++) {
    if (datesToReturn[k][0].split('T')[0] === dates[i].split('T')[0]) {
      datesToReturn[k].push(dates[i]);
    } else {
      k++;
      datesToReturn[k] = [dates[i]];
    }
  }

  return datesToReturn;
};

export const findWorder = (date: string, hours: GetFreeHoursReturn) => {
  const worker = hours.freeHours.find((el) => el.startHours.includes(date));
  return worker !== undefined ? worker.workerId : null;
};
