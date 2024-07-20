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


function createEmployeeRecords(arrays) {
  return arrays.map(createEmployeeRecord);
}

function createTimeInEvent(dateTime) {
  let [date, hour] = dateTime.split(' ');
  this.timeInEvents.push({
      type: "TimeIn",
      hour: parseInt(hour, 10),
      date
  });
  return this;
}


function createTimeOutEvent(dateTime) {
  let [date, hour] = dateTime.split(' ');
  this.timeOutEvents.push({
      type: "TimeOut",
      hour: parseInt(hour, 10),
      date
  });
  return this;
}

function hoursWorkedOnDate(date) {
  let inEvent = this.timeInEvents.find(e => e.date === date);
  let outEvent = this.timeOutEvents.find(e => e.date === date);
  return (outEvent.hour - inEvent.hour) / 100;
}


function wagesEarnedOnDate(date) {
  return hoursWorkedOnDate.call(this, date) * this.payPerHour;
}

function allWagesFor() {
  let dates = this.timeInEvents.map(e => e.date);
  let payable = dates.reduce((memo, d) => memo + wagesEarnedOnDate.call(this, d), 0);
  return payable;
}

function findEmployeeByFirstName(srcArray, firstName) {
  return srcArray.find(rec => rec.firstName === firstName);
}


function calculatePayroll(arrayOfEmployeeRecords) {
  return arrayOfEmployeeRecords.reduce((memo, rec) => memo + allWagesFor.call(rec), 0);
}


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
