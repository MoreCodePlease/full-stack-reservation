const service = require("./tables.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

/**Validator functions*/
const propertiesTemplate = [
  "table_id",
  "table_name",
  "capacity",
  "reservation_id",
]
const propertiesNew = [
  "table_name",
  "capacity"
];
function validExistingProperties(property) {
  return function (req, res, next) {
    const { data = {} } = req.body;
    for(let key of Object.keys(data)) {
      if (!property.includes(key)) return next({ status: 400, message: `invalid field: ${key}` });
    }
    next();
  }
};
function validBodyProperty(property) {
  return function validateProperty(req, res, next) {
    const { data = {} } = req.body;
    for(let item of property) {
      if (!data[item]) return next({ status: 400, message: `missing: ${item}` });
    }
    next();
};
}
function validName(req, res, next) {
  const {table_name} = req.body.data;
  if (typeof table_name === "string" && table_name.trim().length > 1) return next();
  next({status: 400, message: "table_name must be at least 2 characters"});
}
function validCapacity(req, res, next) {
  const {capacity} = req.body.data;
  if(typeof capacity === "number") return next();
  next({status: 400, message: "capacity must be a number."});
}
async function tableExists(req, res, next) {
  const {table_id} = req.params;
  const table = await service.readTable(table_id);
  if (table) {
    res.locals.table = table;
    return next();//{status:400,message: table}
  }
  next({status: 404, message: `table id not found: ${table_id}`});
}//res.locals.table
async function reservationExists( req, res, next) {
  const {reservation_id} = req.body.data;
  const reservation = await service.readReservation(reservation_id);
  if (reservation) {
    res.locals.reservation = reservation;
    return next();
  }
  next({status: 404, message: `reservation: ${reservation_id} does not exist`})
}//res.locals.reservation
function validBooked(req, res, next) {
  const {status} = res.locals.reservation;
  if (status !== "booked") return next({status:400, message:`reservation status:${status} is invalid`})
  next();
}
async function validPeopleCapacity(req, res, next) {
  const {capacity} = res.locals.table;
  const {people} = res.locals.reservation;
  if(capacity >= people) return next();
  next({status:400, message:"capacity mismatch."})
}
function validIsEmpty(req, res, next) {
  const { reservation_id } = res.locals.table;
  if (reservation_id) return next({status: 400, message: `table:${res.locals.table.table_name} is occupied.`});
  next();
}
function validIsFull(req, res, next) {
  const { reservation_id} = res.locals.table;
  if( !reservation_id) return next({status: 400, message: `table:${res.locals.table.table_name} is not occupied.`})
  next();
}
/**CRUD functions*/
async function list(req, res) {
  const data = await service.list();
  res.status(200).json({ data:data });
}
async function create(req, res, next) {
  const newEntry = {...req.body.data};
  const data = await service.create(newEntry);
  res.status(201).json({data})
}
async function read(req, res, next) {
  const { reservation: data } = res.locals;
  res.json({ data });
}
async function updateTableData(req, res, next) {
  const table = res.locals.table;
  const uTable = { ...req.body.data, table_id: table.table_id};
  const data = await service.updateTable(uTable);
  res.status(200).json({data});
}
async function updateReservationData(req, res, next) {
  const reservation = res.locals.reservation;
  await service.updateReservation(reservation.reservation_id,"seated");
  next();
}
async function deleteSeating(req, res, next) {
  const {table_id, reservation_id} = res.locals.table;
  await service.updateReservation(table_id, "finished");
  await service.destroySeat(table_id);
  res.sendStatus(200);
}
async function deleteTable(req, res, next) {
  const {table_id} = res.locals.table;
  await service.destroyTable(table_id);
  res.sendStatus(204);
}


module.exports = {
  list: [asyncErrorBoundary(list)],
  create: [validExistingProperties(propertiesTemplate),
    validBodyProperty(propertiesNew),
    validName,
    validCapacity,
    asyncErrorBoundary(create)
  ],
  update: [validExistingProperties(propertiesTemplate),
    validBodyProperty(["reservation_id"]),
    tableExists,
    reservationExists,
    validBooked,
    validPeopleCapacity,
    validIsEmpty,
    asyncErrorBoundary(updateReservationData),
    asyncErrorBoundary(updateTableData)
  ],
  destroySeat: [ 
    tableExists,
    validIsFull,
    asyncErrorBoundary(deleteSeating)
  ],
  destroyTable: [
    tableExists,
    asyncErrorBoundary(deleteTable)
  ]
}