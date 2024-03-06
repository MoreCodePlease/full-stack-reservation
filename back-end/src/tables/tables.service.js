const knex = require("../db/connection");


function list() {
  return knex("tables").select("*")
  .orderBy("table_name", "asc");
}
function create(table) {
  return knex("tables").insert(table)
    .returning("*")
    .then((response) => response[0]);
}
function readTable(record) {
  return knex("tables").select("*")
      .where({table_id: record})
      .then((response) => response[0]);
} 
function readReservation(record) {
  return knex("reservations").select("*")
      .where({reservation_id: record})
      .then((response) => response[0]);
} 
function updateTable(changedTable) {
  return knex("tables").select("*")
    .where({table_id: changedTable.table_id})
    .update(changedTable, "*")
    .then((response) => response[0]);
}
function destroyTable(table_id) {
  return knex("tables")
    .where({table_id})
    .del();
}
function destroySeat(table_id) {
  return knex("tables").select("*")
    .where({ table_id })
    .update({ reservation_id: null});
}
function updateReservation(res_id, status) {
  return knex("reservations")
    .where({reservation_id: res_id})
    .update({ status: status}, "*")
    .then((response) => response[0]);
}

module.exports = {
  list,
  create,
  readTable,
  readReservation,
  destroySeat,
  destroyTable,
  updateTable,
  updateReservation
}