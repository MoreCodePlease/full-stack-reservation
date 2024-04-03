import React, { useEffect, useState } from "react";
import { listReservations, listTables } from "../utils/api";
import { previous, next } from "../utils/date-time";
import ErrorAlert from "../layout/ErrorAlert";
import { Link } from "react-router-dom";
import ListRes from "../reservations/ListRes";
import ListTable from "../tables/ListTable";

/**
 * Defines the dashboard page.
 * @param date
 *  the date for which the user wants to view reservations.
 * @returns {JSX.Element}
 */
function Dashboard({ date }) {
  const [reservations, setReservations] = useState([]);
  const [reservationsError, setReservationsError] = useState(null);
  const [tables, setTables] = useState([]);
  const [tablesError, setTablesError] = useState([]);

  useEffect(loadDashboard, [date]);

  function loadDashboard() {
    console.log(date);
    const abortController = new AbortController();
    setReservationsError(null);
    listReservations({ date }, abortController.signal)
      .then(setReservations)
      .catch(setReservationsError);
    listTables(abortController.signal)
      .then(setTables)
      .catch(setTablesError);
    return () => abortController.abort();
  }
  console.log(tables);
  return (
    <main>
      <h1>Dashboard</h1>
        <Link to={`/dashboard`}> Today </Link>
        <Link to={`/dashboard/?date=${previous(date)}`}> Previous </Link>
        <Link to={`/dashboard/?date=${next(date)}`}> Next </Link>
      <div className="d-md-flex mb-3">
        <h4 className="mb-0">Reservations for: {date}</h4>        
      </div>
      <ErrorAlert error={reservationsError} />
      <ErrorAlert error={tablesError} />
      
      <ListRes reservations={reservations} date={date} />
      <ListTable tables={tables} />
      <br />
      <p>{JSON.stringify(reservations)}</p>
      <br />
      <p>{JSON.stringify(tables)}</p>
    </main>
  );
}


export default Dashboard;