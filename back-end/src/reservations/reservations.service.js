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
  return knex("reservations")
    .select("*")
    .where({ reservation_id: record })
    .then((response) => response[0]);
}   

function create(reserve) {
  return knex("reservations").insert(reserve)
    .returning("*").then((newReserve) => newReserve[0])
}

function updateRes(res) {
  return knex("reservations")
    .select("*")
    .where({ reservation_id: res.reservation_id })
    .update(res, "*")
    .then((response) => response[0]);
}

function updateStatus(res_id, res_status) {
  return knex("reservations")
    .where({reservation_id: res_id})
    .update({ status: res_status}, "*")
    .then((response) => response[0]);
}

function search(mobile_number) {
  return knex("reservations")
    .whereRaw(
      "translate(mobile_number, '() -', '') like ?",
      `%${mobile_number.replace(/\D/g, "")}%`
    )
    .orderBy("reservation_date");
}

module.exports = {
  list,
  listDateOf,
  read,
  create,
  updateRes,
  updateStatus,
  search
}