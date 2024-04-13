import React, {useState, useEffect} from "react";
import { useParams } from "react-router-dom";
import FormRes from "./FormRes";
import { readReservation } from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";


function EditRes () {
  const params = useParams();
  const reservation_id = params.reservation_id;
  const [reservation, setReservation] = useState([]);
  const [reservationError, setReservationError] = useState(null);
  
  useEffect(() => {
    const abortController = new AbortController();
    readReservation(reservation_id, abortController.signal).then((response) => {
      setReservation({
        first_name: response.first_name,
        last_name: response.last_name,
        mobile_number: response.mobile_number,
        reservation_date: response.reservation_date.slice(0, 10),
        reservation_time: response.reservation_time.slice(0, 5),
        people: response.people,
        status: response.status,
      })
    }).catch(setReservationError);
  },[reservation_id]);

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