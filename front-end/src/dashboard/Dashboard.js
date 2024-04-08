import React, { useEffect, useState } from "react";
import { listReservations, listTables, finishTable } from "../utils/api";
import { previous, next } from "../utils/date-time";
import ErrorAlert from "../layout/ErrorAlert";
import { Link } from "react-router-dom";
import ListRes from "../reservations/ListRes";
import ListTable from "../tables/ListTable";
import { useHistory } from "react-router-dom";

/**
 * Defines the dashboard page.
 * @param date
 *  the date for which the user wants to view reservations.
 * @returns {JSX.Element}
 */
function Dashboard({ date }) {
  const [reservations, setReservations] = useState([]);
  const [reservationsError, setReservationsError] = useState(false);
  const [tables, setTables] = useState([]);
  const [tablesError, setTablesError] = useState(false);
  const history = useHistory();

  useEffect(loadDashboard, [date]);
  useEffect(loadTables, []);
  function loadDashboard() {
    console.log(date);
    const abortController = new AbortController();
    setReservationsError(null);
    listReservations({ date }, abortController.signal)
      .then(setReservations)
      .catch(setReservationsError);
    //listTables(abortController.signal)
    //  .then(setTables)
    //  .catch(setTablesError);
    return () => abortController.abort();
  }

  function loadTables() {
    const abortController = new AbortController();
    listTables(abortController.signal)
      .then(setTables)
      .catch(setTablesError);
    return () => abortController.abort();
  }

  const handleFinish = async (table_id) => {
    const abortController = new AbortController();
    const confirmWindow = window.confirm("Is this table ready to seat new guests? This cannot be undone.");
    if(confirmWindow) {
      try {
        await finishTable(table_id, abortController.signal);
        loadDashboard();
        loadTables();
      } catch (error) {
        setReservationsError(error);
      }
      history.push("/");
    }
  }

  return (
    <main>
      <h1>Dashboard</h1>
        <Link to={`/dashboard`}> Today </Link>
        <Link to={`/dashboard/?date=${previous(date)}`}> Previous </Link>
        <Link to={`/dashboard/?date=${next(date)}`}> Next </Link>
      <div className="d-md-flex mb-3">
        <h4 className="mb-0">Reservations for: {date.slice(0,10)}</h4>        
      </div>
      <ErrorAlert error={reservationsError} />
      <ErrorAlert error={tablesError} />
      
      <ListRes reservations={reservations} date={date} />
      <ListTable tables={tables} handleFinish={handleFinish} />
      <br />
      <p>{JSON.stringify(reservations)}</p>
      <br />
      <p>{JSON.stringify(tables)}</p>
    </main>
  );
}

export default Dashboard;