import { parse, format } from 'date-fns';

export const convertTo12h = (timeString: string) => {
  const parsedTime = parse(timeString, 'HH:mm:ss', new Date());
  const time = format(parsedTime, 'hh:mm b');
  return time;
};
