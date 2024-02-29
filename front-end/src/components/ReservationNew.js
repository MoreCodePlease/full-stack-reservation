import React from "react";
import { useHistory } from "react-router-dom";
import FormReservation from "./FormReservation";


function ReservationNew () {
  const history = useHistory();

  const reserve = {
    first_name: "",
    last_name: "",
    mobile_number: "",
    reservation_date: "",
    reservation_time: "",
    people: "1",
    status: "booked",
  };

  return (
    <div>
      <h1>New Reservation</h1>
      <FormReservation reserve={reserve} isNew={true}/>
    </div>
  )



}

export default ReservationNew;