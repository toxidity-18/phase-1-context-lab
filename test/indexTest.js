// Function to create a single employee record
function createEmployeeRecord(arr) {
  return {
      firstName: arr[0],
      familyName: arr[1],
      title: arr[2],
      payPerHour: arr[3],
      timeInEvents: [],
      timeOutEvents: []
  };
}

// Function to create multiple employee records
function createEmployeeRecords(arrays) {
  return arrays.map(createEmployeeRecord);
}

// Function to create a timeIn event
function createTimeInEvent(dateTime) {
  let [date, hour] = dateTime.split(' ');
  this.timeInEvents.push({
      type: "TimeIn",
      hour: parseInt(hour, 10),
      date
  });
  return this;
}

// Function to create a timeOut event
function createTimeOutEvent(dateTime) {
  let [date, hour] = dateTime.split(' ');
  this.timeOutEvents.push({
      type: "TimeOut",
      hour: parseInt(hour, 10),
      date
  });
  return this;
}

// Function to calculate hours worked on a specific date
function hoursWorkedOnDate(date) {
  let inEvent = this.timeInEvents.find(e => e.date === date);
  let outEvent = this.timeOutEvents.find(e => e.date === date);
  return (outEvent.hour - inEvent.hour) / 100;
}

// Function to calculate wages earned on a specific date
function wagesEarnedOnDate(date) {
  return hoursWorkedOnDate.call(this, date) * this.payPerHour;
}

// Function to calculate total wages for all dates
function allWagesFor() {
  let dates = this.timeInEvents.map(e => e.date);
  let payable = dates.reduce((memo, d) => memo + wagesEarnedOnDate.call(this, d), 0);
  return payable;
}

// Function to find an employee by first name
function findEmployeeByFirstName(srcArray, firstName) {
  return srcArray.find(rec => rec.firstName === firstName);
}

// Function to calculate total payroll for all employees
function calculatePayroll(arrayOfEmployeeRecords) {
  return arrayOfEmployeeRecords.reduce((memo, rec) => memo + allWagesFor.call(rec), 0);
}

// Export functions for testing
module.exports = {
  createEmployeeRecord,
  createEmployeeRecords,
  createTimeInEvent,
  createTimeOutEvent,
  hoursWorkedOnDate,
  wagesEarnedOnDate,
  allWagesFor,
  findEmployeeByFirstName,
  calculatePayroll
};
