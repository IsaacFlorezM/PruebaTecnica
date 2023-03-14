/**
 * Capitalize the first letter of a string
 * @param {string} str - The string to capitalize
 * @returns {string} - The capitalized string
 */
export const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1);

/**
 * Format the date in the format "MM/DD/YYYY"
 * @param {string} date - The date to format
 * @returns {string} - The formatted date
 */
export const formatDate = (date) => {
  const d = new Date(date);
  let month = '' + (d.getMonth() + 1);
  let day = '' + d.getDate();
  const year = d.getFullYear();

  if (month.length < 2) {
    month = '0' + month;
  }

  if (day.length < 2) {
    day = '0' + day;
  }

  return [month, day, year].join('/');
};

/**
 * Get the error message from an axios error object
 * @param {object} error - The axios error object
 * @returns {string} - The error message
 */
export const getErrorMessage = (error) =>
  error.response?.data?.error || 'An error occurred. Please try again later.';
