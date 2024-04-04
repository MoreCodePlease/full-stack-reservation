import React, {useState, useEffect} from "react";
import { useParams } from "react-router-dom";
import FormRes from "./FormRes";
import { readReservation } from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";


function EditRes () {
  const {reservation_id} = useParams();
  const [reservation, setReservation] = useState([]);
  const [reservationError, setReservationError] = useState(null);
  
  useEffect(loadReservation,[reservation_id]);

  function loadReservation() {
    const abortController = new AbortController();
    setReservationError(null);
    readReservation(reservation_id, abortController.signal)
    .then(setReservation)
    .catch(setReservationError);
  }

  const reserve = {
    //reservation_id: Number(reservation_id),
    first_name: reservation.first_name,
    last_name: reservation.last_name,
    mobile_number: reservation.mobile_number,
    reservation_date:reservation.reservation_date,
    reservation_time:reservation.reservation_time,
    people: reservation.people,
    status: reservation.status
  }

  return (
    <div>
      <h1>Edit Reservation</h1>
      <div>
        <ErrorAlert error={reservationError} />
      </div>
      <FormRes reserve={reserve} isNew={false}/>
    </div>
  )
}

export default EditRes;