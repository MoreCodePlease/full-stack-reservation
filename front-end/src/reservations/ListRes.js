import React from "react";
import { Link } from "react-router-dom";



function ListRes({reservations, date}) {
  const list = reservations.map((item, index) => {
    const butts = (
      <div>
        <Link to ={`/reservations/${item.reservation_id}/edit`} className="btn btn-outline-primary mx-1" >
        Edit</Link>
        <Link to={`/reservations/${item.reservation_id}/seat`} className="btn btn-outline-primary mx-1" >
        Seat</Link>
        <button className="btn btn-danger" type="button">Cancel</button>
      </div>
    )
    const noButts = (
      <div>
        <button className="btn btn-danger" type="button">
        Cancel</button>
      </div>
    )
    return (
      <tr key={index} className="res-text table-row">
        <td>{item.reservation_id}</td>
        <td>{item.first_name}</td>
        <td>{item.last_name}</td>
        <td>{item.mobile_number}</td>
        <td>{item.reservation_date}</td>
        <td>{item.reservation_time}</td>
        <td>{item.people}</td>
        <td data-reservation-id-status={item.reservation_id}>{item.status}</td>
        <td>
          {(item.status === "booked")?butts:noButts}
        </td>
      </tr>
    )
    
  });
  return (
    <div>
      <table className="table table-bordered table-striped">
        <thead className="thead-dark">
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

export default ListRes;