import React, { useEffect, useState } from "react";
import { listReservations } from "../utils/api";
import { previous, next } from "../utils/date-time";
import ErrorAlert from "../layout/ErrorAlert";
import DashReservations from "../components/DashReservation"; 
import { Link } from "react-router-dom";

/**
 * Defines the dashboard page.
 * @param date
 *  the date for which the user wants to view reservations.
 * @returns {JSX.Element}
 */
function Dashboard({ date }) {
  const [reservations, setReservations] = useState([]);
  const [reservationsError, setReservationsError] = useState(null);

  useEffect(loadDashboard, [date]);

  function loadDashboard() {
    console.log(date);
    const abortController = new AbortController();
    setReservationsError(null);
    listReservations({ date }, abortController.signal)
      .then(setReservations)
      .catch(setReservationsError);
    return () => abortController.abort();
  }

  return (
    <main>
      <h1>Dashboard</h1>
        <Link to={`/dashboard`}>Today</Link>
        <Link to={`/dashboard/?date=${previous(date)}`}>Previous</Link>
        <Link to={`/dashboard/?date=${next(date)}`}>Next</Link>
      <div className="d-md-flex mb-3">
        <h4 className="mb-0">Reservations for date: {date}</h4>
        <br />
        <div>
          
        </div>
        
      </div>
      <ErrorAlert error={reservationsError} />
      
      <DashReservations reservations={reservations} date={date} />
      <p>{JSON.stringify(reservations)}</p>
    </main>
  );
}


export default Dashboard;