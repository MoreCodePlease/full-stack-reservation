import React from "react";
import { Link } from "react-router-dom";

const listStatus = ["booked", "seated"];

function DashReservations({reservations, date}) {
  const list = reservations.map((item, index) => {
    if(listStatus.includes(item.status)){
      return (
        <tr key={index} className="res-text table-row">
          <td>{item.reservation_id}</td>
          <td>{item.first_name}</td>
          <td>{item.last_name}</td>
          <td>{item.mobile_number}</td>
          <td>{item.reservation_date}</td>
          <td>{item.reservation_time}</td>
          <td>{item.people}</td>
          <td>{item.status}</td>
        </tr>
      )
    } 
  });

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Reservation Id</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Phone Number</th>
            <th>Reservation Date</th>
            <th>Reservation Time</th>
            <th>People</th>
            <th>status</th>
          </tr>
        </thead>
        <tbody>
          {list}
        </tbody>
      </table>
    </div>
  )

}

export default DashReservations;