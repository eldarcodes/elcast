import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(relativeTime);

export const getRelativeTime = (date: string) => {
  console.log(dayjs.locale());
  return dayjs(date).fromNow();
};
