/**
 * Capitalizes the first character of a string
 * @param string
 * @returns {string|*}
 */
const capitalizeString = (string) => {
  if (string.length) {
    return string[0].toUpperCase() + string.slice(1);
  }
  return string;
};

export { capitalizeString };
