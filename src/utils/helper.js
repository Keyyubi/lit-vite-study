import { isValidDate, isValidEmail, isValidPhone } from "./validators";

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

/**
 * This function will check the given employee object to see if all fields valid or not
 * This function will return object that has errorMessages array and errorFields array and validation result
 * @param {string} dateString
 * @returns {object}
 */
export const validateEmployeeInformation = (employee) => {
  const result = {
    isValid: true,
    errorMessages: [],
    errorFields: [],
  };

  for (const key in employee) {
    if (Object.prototype.hasOwnProperty.call(employee, key)) {
      if (key === "id") continue;
      const value = employee[key];
      if (!value) result.errorFields.push(key);
    }
  }

  if (result.errorFields.length > 0) {
    result.isValid = false;
    result.errorMessages.push("Please fill all required fields properly.");
  }

  if (!isValidDate(employee.dateOfBirth)) {
    result.isValid = false;
    result.errorFields.push("dateOfBirth");
    result.errorMessages.push("Plase enter a valid birth date");
  }

  if (!isValidDate(employee.dateOfEmployment)) {
    result.isValid = false;
    result.errorFields.push("dateOfEmployment");
    result.errorMessages.push("Plase enter a valid employment date");
  }

  if (!isValidEmail(employee.email)) {
    result.isValid = false;
    result.errorFields.push("email");
    result.errorMessages.push("Plase enter a valid email address");
  }

  if (!isValidPhone(employee.phone)) {
    result.isValid = false;
    result.errorFields.push("phone");
    result.errorMessages.push("Plase enter a valid phone number");
  }

  if (!employee.department) {
    result.isValid = false;
    result.errorFields.push("department");
    result.errorMessages.push("Plase select department of the employee");
  }

  if (!employee.position) {
    result.isValid = false;
    result.errorFields.push("position");
    result.errorMessages.push("Plase select position of the employee");
  }

  return result;
};

/**
 * This function used to get selected items label
 * It gets 2 parameters: `options` array and selected item code as `itemCode`
 * @param {Array} options
 * @param {string} itemCode
 * @returns {string}
 */
export const getSelectedItemByCode = (options, itemCode) => {
  const item = options.find((item) => item.code === itemCode);
  return item ? item.name : "";
};
