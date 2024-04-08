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

  async function loadReservation() {
    const abortController = new AbortController();
    setReservationError(null);
    try {
      let result = await readReservation(reservation_id, abortController.signal);
      result.reservation_time = result.reservation_time.slice(0,5);
      setReservation(result);
    } catch (error) {
      setReservationError(error);
    }
  }

  const reserve = {
    reservation_id: reservation_id,
    first_name: reservation.first_name,
    last_name: reservation.last_name,
    mobile_number: reservation.mobile_number,
    reservation_date: reservation.reservation_date,
    reservation_time: reservation.reservation_time,
    people: reservation.people,
    status: reservation.status,
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