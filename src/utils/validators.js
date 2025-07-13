import { MIN_YEAR } from "../constants/constants";
import { getDestructedDate } from "./helper";

export const isValidEmail = (email) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  return regex.test(email);
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
  if (date.year < MIN_YEAR || date.year > currentYear) return false;

  return true;
};
