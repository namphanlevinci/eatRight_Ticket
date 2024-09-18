import dayjs from 'dayjs';

export const ConvertTimeToDayjs = (time: string) => {
    const [hours, minutes] = time.split(':').map(Number);
    return dayjs().set('hour', hours).set('minute', minutes).set('second', 0);
};
