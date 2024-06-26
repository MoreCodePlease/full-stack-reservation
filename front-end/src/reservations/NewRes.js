import React from "react";
import FormRes from "./FormRes";


function NewRes () {

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
      <FormRes reserve={reserve} isNew={true}/>
    </div>
  )

}

export default NewRes;