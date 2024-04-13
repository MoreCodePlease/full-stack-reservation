import React from "react";
import { Link } from "react-router-dom";
import { updateReservationStatus } from "../utils/api";



function ListRes({reservations, date}) {

  async function handleCancel(reservation_id) {
    const abortController= new AbortController();
    const confirmWindow = window.confirm("Do you want to cancel this reservation? This cannot be undone.");
    if(confirmWindow) {
      try {
        await updateReservationStatus(reservation_id, "cancelled", abortController.signal);  
        window.location.reload();
      } catch (error) {
        
      }
      
    }
  }

  const list = reservations.map((item, index) => {
    
    if(item.status ==="finished" || item.status ==="cancelled") return null;
    
    const butts = (
      <div>
        <Link to ={`/reservations/${item.reservation_id}/edit`} className="btn btn-outline-primary mx-1" >
        Edit</Link>
        <Link to={`/reservations/${item.reservation_id}/seat`} className="btn btn-outline-primary mx-1" >
        Seat</Link>
        <button 
          data-reservation-id-cancel={item.reservation_id} 
          className="btn btn-danger" 
          onClick={() => handleCancel(item.reservation_id)}
          type="button">
        Cancel</button>
      </div>
    )
    const noButts = (
      <div>
        <button 
          data-reservation-id-cancel={item.reservation_id} 
          className="btn btn-danger" 
          onClick={() => handleCancel(item.reservation_id)}
          type="button">
        Cancel</button>
      </div>
    )
    return (
      <tr key={item.reservation_id} className="res-text table-row">
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
            <th>Options</th>
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