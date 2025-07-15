import { isValidDate, isValidEmail, isValidPhone } from "./validators";

/**
 * This function will convert the date string formt from `DD/MM/YYYY` to `YYYY-MM-DD` format;
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
 * This function will convert the date string formt from `YYYY-MM-DD` to `DD/MM/YYYY` format;
 * @param {string} dateString
 * @returns {string | null}
 */
export const convertDateToLoad = (dateString) => {
  const [year, month, day] = dateString.split("-");

  return `${day}/${month}/${year}`;
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
    result.errorMessages.push("Validation.FillRequiredFields");
  }

  if (!isValidDate(employee.dateOfBirth)) {
    result.isValid = false;
    result.errorFields.push("dateOfBirth");
    result.errorMessages.push("Validation.NotValidBirthDate");
  }

  if (!isValidDate(employee.dateOfEmployment)) {
    result.isValid = false;
    result.errorFields.push("dateOfEmployment");
    result.errorMessages.push("Validation.NotValidEmploymentDate");
  }

  if (!isValidEmail(employee.email)) {
    result.isValid = false;
    result.errorFields.push("email");
    result.errorMessages.push("Validation.NotValidEmail");
  }

  if (!isValidPhone(employee.phone)) {
    result.isValid = false;
    result.errorFields.push("phone");
    result.errorMessages.push("Validation.NotValidPhone");
  }

  if (!employee.department) {
    result.isValid = false;
    result.errorFields.push("department");
    result.errorMessages.push("Validation.SelectDepartment");
  }

  if (!employee.position) {
    result.isValid = false;
    result.errorFields.push("position");
    result.errorMessages.push("Validation.SelectPosition");
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
