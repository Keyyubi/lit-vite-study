import { MIN_YEAR, PHONE_CODE, PHONE_LENGTH_WITHOUT_CODE } from "../constants/constants";

const getUnmaskedString = (text) => {
  return text.replace(/[+()/]/g, "").replaceAll(" ", "");
};

/**
 * The `date` parameter should be in the same format with DATE_FORMAT constant
 * @param {string} date
 * @returns {object}
 */
const getDestructedDate = (date) => {
  if (!date) return null;

  const [d, m, y] = date.split("/");
  const day = parseInt(d) | 0;
  const month = parseInt(m) | 0;
  const year = parseInt(y) | 0;
  const currentYear = new Date().getFullYear();

  return {
    day,
    month,
    year,
    currentYear,
  };
};

/**
 * This function checks whether given text is a valid email address or not
 * @param {string} date
 * @returns {boolean}
 */
export const isValidEmail = (email) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  return regex.test(email);
};

/**
 * The `dateString` parameter should be in the same format with DATE_FORMAT constant
 * @param {string} dateString
 * @returns {boolean}
 */
export const isValidDate = (dateString) => {
  if (!dateString) return false;

  const date = getDestructedDate(dateString);

  if (!date) return false;
  if (date.day < 1 || date.day > 32) return false;
  if (date.month < 1 || date.month > 12) return false;
  if (date.year < MIN_YEAR || date.year > date.currentYear) return false;

  return true;
};

export const isValidPhone = (phoneString) => {
  if (!phoneString) return false;

  const unmasked = getUnmaskedString(phoneString);
  if (unmasked.length !== PHONE_LENGTH_WITHOUT_CODE) return false;

  return true;
};
