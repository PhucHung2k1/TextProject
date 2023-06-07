import moment from 'moment';

export const formatTimeMMSS = (time: number): string => {
  const duration = moment.duration(time, 'seconds');
  return moment.utc(duration.asMilliseconds()).format('mm:ss');
};
