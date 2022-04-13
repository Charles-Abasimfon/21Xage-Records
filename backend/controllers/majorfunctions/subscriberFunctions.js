/*@Desc This function serves to get the number of days between today and subscription date and returns the status of the subscriber  */
function getSubscriberStatus(subscriptionDate) {
  const todaysFullDate = new Date();
  const todaysShortDate =
    todaysFullDate.getFullYear() +
    '-' +
    (todaysFullDate.getMonth() + 1) +
    '-' +
    todaysFullDate.getDate();
  const date1 = new Date(subscriptionDate);
  const date2 = new Date(todaysShortDate);
  const oneDay = 1000 * 60 * 60 * 24;
  const diffInTime = date2.getTime() - date1.getTime();
  const diffInDays = Math.round(diffInTime / oneDay);
  // If the difference is greater than 30 days, return Expired.
  if (diffInDays > 30) {
    return 'Expired';
  } else {
    // If the difference is greater than 23 days, return Almost Expired else return Active
    if (diffInDays > 23) {
      return 'Almost Expired';
    } else {
      return 'Active';
    }
  }
}

/*@Desc This function serves to return the number of days before subscriber expires  */
function getNoOfDaysBeforeExpiration(subscriptionDate) {
  const todaysFullDate = new Date();
  const todaysShortDate =
    todaysFullDate.getFullYear() +
    '-' +
    (todaysFullDate.getMonth() + 1) +
    '-' +
    todaysFullDate.getDate();
  const date1 = new Date(subscriptionDate);
  const date2 = new Date(todaysShortDate);
  const oneDay = 1000 * 60 * 60 * 24;
  const diffInTime = date2.getTime() - date1.getTime();
  const diffInDays = Math.round(diffInTime / oneDay);
  // If the difference is greater than 30 days, return 0 else find no of days left and return that
  if (diffInDays >= 30) {
    return '0';
  } else {
    const noOfDaysLeft = 30 - diffInDays;
    return noOfDaysLeft;
  }
}

/* @Desc This function calculates and returns the date of a day after a given number of days from a given date */
function getDateOfDay(dateValue, days) {
  Date.prototype.addDays = function (days) {
    var date = new Date(this.valueOf());
    date.setDate(date.getDate() + days);
    return date;
  };
  var date = new Date(dateValue);
  const dateOfDay = date.addDays(days);
  var d = new Date(dateOfDay),
    month = '' + (d.getMonth() + 1),
    day = '' + d.getDate(),
    year = d.getFullYear();
  if (month.length < 2) month = '0' + month;
  if (day.length < 2) day = '0' + day;
  const formattedDate = [year, month, day].join('-');

  if (days < 1) {
    return dateValue;
  } else {
    return formattedDate;
  }
}

module.exports = {
  getSubscriberStatus,
  getNoOfDaysBeforeExpiration,
  getDateOfDay,
};
