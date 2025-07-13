import { isValidDate } from "./validators";

/**
 * This function will convert the date string formt from DATE_FORMAT to `YYYY-MM-DD` format;
 * @param {string} dateString
 * @returns {string | null}
 */
export const convertDateToSave = (dateString) => {
  if (dateString && isValidDate(dateString)) {
    const [day, month, year] = dateString.split("/");

    return `${year}-${month}-${day}`;
  }

  return null;
};
