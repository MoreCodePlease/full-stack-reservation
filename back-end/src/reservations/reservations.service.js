const knex = require("../db/connection");

function list() {
  return knex("reservations").select("*");
}

function listDateOf(date) {
  return knex("reservations").select("*")
    .where({reservation_date: date})
    .whereNot({status: "finished"})
    .orderBy("reservation_time", "asc");
    
}

function read(record) {
  return knex("reservations").select("*")
      .where({reservation_id: record})
      .then((response) => response[0]);
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
  listDateOf,
  read,
  create,
  update,
}