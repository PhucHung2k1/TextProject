import moment from 'moment';

export const convertTo12h = (timeString: string) => {
  const time = moment(timeString, 'HH:mm:ss').format('h:mm A');
  return time;
};

export const convertTo24h = (timeString: string) => {
  const time = moment(timeString, 'h:mm A').format('HH:mm:ss');
  return time;
};
