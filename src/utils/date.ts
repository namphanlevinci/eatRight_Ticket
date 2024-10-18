import dayjs from 'dayjs';

export const ConvertTimeToDayjs = (time: string) => {
    const [hours, minutes] = time.split(':').map(Number);
    return dayjs().set('hour', hours).set('minute', minutes).set('second', 0);
};

export function getCurrentMonthDates() {
    const now = new Date();
    const currentMonth = now.getMonth(); // Tháng hiện tại (0-11)
    const year = now.getFullYear(); // Năm hiện tại

    // Ngày đầu tháng
    const firstDay = new Date(year, currentMonth, 1);

    // Ngày cuối tháng
    const lastDay = new Date(year, currentMonth + 1, 0);

    return {
        firstDay: firstDay,
        lastDay: lastDay,
    };
}
