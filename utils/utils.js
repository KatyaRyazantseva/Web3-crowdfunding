/**
 * Cuts a short error message (reason) from the full error message
 * @param string
 * @returns {string}
 */
const shortErrorMessage = (message) => {
    let errMessage = message;
    const startErrPosition = errMessage.indexOf('"reason":"');
    const endErrPosition = errMessage.indexOf('"},"stack":"');
    if ((startErrPosition > -1) && (endErrPosition > -1) && (startErrPosition < endErrPosition)) {
      errMessage = errMessage.substring(startErrPosition + 10, endErrPosition);
    };
    return errMessage;
  };

/**
 * Converts date to timestamp 
 * @param date
 * @returns {number}
 */
const dateToTimestamp = (convDate) => {
  try {
    return new Date(convDate).getTime() / 1000;
  } catch (e) {
    console.log('dateToTimestamp convertion error: ', e.message);
    return 0;
  };
}

/**
 * Converts timestamp to date 
 * @param number
 * @returns {date}
 */
const timestampToDate = (convTimestamp) => {
  try {
        return new Date(convTimestamp * 1000);
  } catch (e) {
    return new Date();
  };
}

/**
 * Calculates the difference between two timestamps
 * @param number
 * @returns {number}
 */
const timestampGapToDays = (timestampStart, timestampEnd) => {
  if (timestampStart >= timestampEnd) {
    return 0;
  }
  try {
    return Math.ceil((timestampEnd - timestampStart) / 86400);
  } catch (e) {
    console.log(e.message);
    return 0;
  };
}

const increaseDate = (date, numberOfDays) => {
  try {
    return new Date(date.setDate(date.getDate() + numberOfDays)).toISOString().slice(0, 10);
  } catch (e) {
    return date;
  };
}

export { shortErrorMessage, dateToTimestamp, timestampToDate, timestampGapToDays, increaseDate };