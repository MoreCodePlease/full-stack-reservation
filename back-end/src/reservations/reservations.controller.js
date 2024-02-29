/**
 * List handler for reservation resources
 */
const service = require("./reservations.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
/**
 * Validator functions
 */
const expectedNewProperties = [
  "first_name",
  "last_name",
  "mobile_number",
  "reservation_date",
  "reservation_time",
  "people"
];
const expectedExistingProperties = [
  "reservation_id",
  "first_name",
  "last_name",
  "mobile_number",
  "reservation_date",
  "reservation_time",
  "people",
  "status",
  "created_at",
  "updated_at"
];
const expectedStatus = [
  "booked", 
  "seated",
  "finished",
  "cancelled"
];
function validNewProperties() {
  return function (req, res, next) {
    const { data = {} } = req.body;
    for(let i=0; i< expectedNewProperties.length; i++) {
      if(!data[expectedNewProperties[i]]) return next({status: 400,message: `${expected} is required.`});
    }
    next();
  }
}
function validExistingProperties() {
  const { data = {} } = req.body;
  const invalidProperties =[];
  for (let key in data) {
    if(!expectedExistingProperties.includes(key)) invalidProperties.push(key);
  }
  return (!invalidProperties.length)? next(): next({status:400,message:`${invalidFields.join(", ")} are not valid fields.`})

}
function validDate(req,res,next) {
  const { reservation_date } = req.body.data;
  const isValid = isNaN(Date.parse(reservation_date));
  return (isValid)? next():next({status: 400,message: `${reservation_date} is not a valid date.`});
}
function validTime(req,res,next) {
  const { reservation_time } = req.body.data;
  const isValid = reservation_time.match(/^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/);
  if (isValid) res.locals.reservation_time = reservation_time;
  return (isValid)? next(): next({status: 400, message: `${reservation_time} is not a valid time.` });
}//res.locals.reservation_time
function validPresent(req, res, next) {
  const { reservation_date, reservation_time } = req.body.data;
  let requestedTime = Date.parse(`${reservation_date} ${reservation_time} CST`);
  if(requestedTime > Date.now()) {
    res.locals.validDateTime = new Date(`${reservation_date} ${reservation_time}`);
    return next()
  }
  next({status: 400, message: "Cannot book reservation in the past."});
}//res.locals.validDateTime
function validResDay (req, res, next) {
  const {validDateTime} = res.locals;
  return (validDateTime.getDay() === 2)? next({status: 400,message: "Restaurant is closed on Tuesday, please choose a different day.",}) : next();
}
function validResTime (req, res, next) {
  const {reservation_time} = req.body.data;
  return (reservation_time < "10:30:00" || reservation_time > "21:30:00")? next({status: 400,message: `Restaurant is closed at ${reservation_time}, please choose a different day.`}) : next();
}
function validPhone(req, res, next) {
  const { mobile_number } = req.body.data;
  const isNum = !isNAN(Number(mobile_number.replace(/[ ,]/g, "")));
  const isValid = mobile_number.match(/^[1-9]\d{2}-\d{3}-\d{4}$/);
  return (isValid && isNum)? next():next({status: 400,message: `${mobile_number} is not a valid phone number.`});
}
function validPeople(req,res,next) {
  let { people } = req.body.data;
  const isValid = !isNaN(people);
  return (isValid && people >= 1 )? next(): next({status: 400, message: `${people} is not a valid number.` });
}
function validInitialStatus(req,res,next) {
  const {status} = req.body.data;
  if(status === "booked") return next();
  next({status:400, message: `${status} is an incorrect status`})
}
function validStatus(req,res,next) {
  const { status } = req.body.data;
  (expectedStatus.includes(status))? next():next({status: 400, message: `"${status}" status is not valid.`});
}
async function reservationExists(req, res, next) {
  const { reservation_id } = req.params;
  const existingReservation = await service.read(reservation_id);
  if (!existingReservation) return next({status:404, message:`Reservation ${reservation_id} cannot be found.`})
  res.locals.reservation = existingReservation;
  next();
}//res.locals.reservation

/**
 * CRUDL functions
 */

async function list(req, res) {
  const {date} = req.query;
  if(date) {
    data =await service.listResOn(date);
  } else {
    data = await service.list();
  }
  res.status(200).json({ data });
}
async function create(req, res, next) {
  const newEntry = {...req.body.data};
  const data = await service.create(newEntry);
  res.status(201).json({data})
}
async function read(req, res) {
  const {reservation: data } = res.locals;
  res.json({ data });
}
async function update(req, res) {
  const inbound = req.body.data;
  const current_id = res.locals.reservation;
  const updated = {...inbound,reservation_id: current_id };
  const data = await service.update(updated);
  res.status(200).json({ data });
}

module.exports = {
  list: [asyncErrorBoundary(list)],
  create: [validExistingProperties,
    validNewProperties,
    validInitialStatus,
    validDate,
    validTime,
    validPresent,
    validResDay,
    validResTime,
    validPhone,
    validPeople,
    asyncErrorBoundary(create)
  ],
  read: [asyncErrorBoundary(reservationExists),
    asyncErrorBoundary(read)
  ],
  update: [asyncErrorBoundary(reservationExists),
    validExistingProperties,
    validNewProperties,
    validInitialStatus,
    validDate,
    validTime,
    validPresent,
    validResDay,
    validResTime,
    validPhone,
    validPeople,
    asyncErrorBoundary(update)
  ]

};
