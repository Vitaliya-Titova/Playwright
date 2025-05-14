import moment from "moment";

const DATE_AND_TIME_FORMAT = "YYYY/MM/DD HH:mm:ss"; //формат даты и времени
const DATE_FORMAT = "YYYY/MM/DD"; //формат даты

//Преобразует строковое значение даты в формат YYYY/MM/DD HH:mm:ss.
export function convertToDateAndTime(value: string) {
  return moment(value).format(DATE_AND_TIME_FORMAT);
}

/**
 *
 * @param {string} value
 * @returns yyyy/mm/dd
 */

//Преобразует строковое значение даты во формат YYYY/MM/DD.
export function convertToDate(value: string) {
  return moment(value).format(DATE_FORMAT);
}
