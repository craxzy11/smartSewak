const timingsArray = require("../test.js");
const jsonString = require("../test"); // importing the dynamic doctor's availability as json
const convertTime = require("../helpers/date"); // to convert date into seconds

module.exports.getAvailableSlot = async (req, res, next) => {
  // console.log(timingsArray)
  // console.log(availableTimings)
  let dateString = req.body.date;
  let time = req.body.time;
  console.log(dateString, " date ", time);

  var d = new Date(dateString);
  // const temp = new Date()
  var day = d.getDay();
  console.log(day);
  

  const jsonObject = JSON.parse(jsonString);

  const timingsArray = [];

  const daysOfWeek = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
  daysOfWeek.forEach(day => {
    const timings = jsonObject.availabilityTimings[day];
    timingsArray.push(timings);
  });

  var flag = 0;
  timingsArray[day].forEach(slot => {
    if (convertTime(slot.start) <= convertTime(time) &&
      convertTime(slot.end) >= convertTime(time)) {
      flag = 1;
    }
  });
  if (flag == 1) {
    return res.status(200).json({
      isAvailable: true
    });
  }
  let counter = 0;
  let i = day;
  while (true) {

    timingsArray[i].forEach(slot => {
      if (i == day) {
        if (flag != 1 && convertTime(slot.start) > convertTime(time)) {
          flag = 1;
          // console.log(convertTime(slot.start)," ",convertTime(time))
          d.setTime(d.getTime() + counter * 86400000);
          const month = d.getUTCMonth() + 1; // months from 1-12
          const day = d.getUTCDate();
          const year = d.getUTCFullYear();

          const newDate = year + "-" + month + "-" + day;
          data = {
            isAvailable: false,
            nextAvailableSlot: {
              date: newDate,
              time: slot.start
            }
          }
        }
      }
      else if (flag != 1) {
        flag = 1;
        d.setTime(d.getTime() + counter * 86400000);
        const month = d.getUTCMonth() + 1; // months from 1-12
        const day = d.getUTCDate();
        const year = d.getUTCFullYear();
        const newDate = year + "-" + month + "-" + day;
        data = {
          isAvailable: false,
          nextAvailableSlot: {
            date: newDate,
            time: slot.start
          }
        }
      }
    }
    )
    if (flag == 1) {
      return res.status(200).json(data);
    }
    i = i + 1;
    i = i % 7;
    counter = counter + 1;
    if (counter == 7)
      break;
  }
  return res.status(400).json({ error: "something went wrong" })
};

