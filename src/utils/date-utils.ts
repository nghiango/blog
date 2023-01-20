import dayjs from "dayjs";
export const DEFAULT_DATE_FORMAT = 'DD-MM-YYYY';

export const formatDate = (date: string, format = DEFAULT_DATE_FORMAT) => {
    return dayjs(date).format(format);
}

export const sortByDate = (date1: string, date2: string): any => {
    return dayjs(date2).toDate().getTime() - dayjs(date1).toDate().getTime();
};