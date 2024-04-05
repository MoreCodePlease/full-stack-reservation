import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import { listTables, readReservation } from "../utils/api";
import FormSeat from "./FormSeat";

function SeatRes() {
  const params = useParams();
  const history = useHistory();
  const reservation_id = params.reservation_id;
  const [tables, setTables] = useState([]);
  const [errorTable, setErrorTable] = useState(false);
  const [reservation, setReservation] = useState([]);

  useEffect(() => {
    const abortController = new AbortController();
    listTables(abortController.signal).then(setTables).catch(setErrorTable);
    readReservation(reservation_id,abortController.signal).then(setReservation).catch(setErrorTable);
  },[])

  return (
    <div>
      <h2>Seat Reservation:</h2>
      <h3>Reservation ID: {reservation_id}</h3>
      <h3>Capacity: {reservation.people}</h3>
      <FormSeat tables={tables} reservation_id={reservation_id}/>
    </div>
  )
}

export default SeatRes