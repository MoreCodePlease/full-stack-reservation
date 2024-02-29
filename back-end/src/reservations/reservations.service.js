const knex = require("../db/connection");

function list() {
  return knex("reservations").select("*");
}

function listOnDate(date) {
  return knex("reservations").select("*")
    .whereNot({status: "finished"})
    .where({reservation_date: date})
    .orderBy("reservation_time", "asc");
    
}

function read(reservation_id) {
  return knex("reservations")
      .select("*")
      .where({"reservation_id": reservation_id})
      .first()
}   

function create(reserve) {
  return knex("reservations").insert(reserve)
    .returning("*").then((newReserve) => newReserve[0])
}

function update(reservation) {
  return knex("reservations")
    .select("*")
    .where({ reservation_id: reservation.reservation_id })
    .update(reservation, "*")
    .then((response) => response[0]);
}

module.exports = {
  list,
  listOnDate,
  read,
  create,
  update,
}