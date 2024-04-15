import React, { useEffect, useState } from "react";
import { listReservations, listTables, finishTable } from "../utils/api";
import { previous, next } from "../utils/date-time";
import ErrorAlert from "../layout/ErrorAlert";
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
    const abortController = new AbortController();
    setReservationsError(null);
    listReservations({ date }, abortController.signal)
      .then(setReservations)
      .catch(setReservationsError);
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
        <div className="btn-group me-2">
          <button onClick={() => history.push(`/dashboard`)} className="btn btn-outline-dark btn m-0 mt-1 float-right"> Today </button>
          <button onClick={() => history.push(`/dashboard/?date=${previous(date)}`)} className="btn btn-outline-dark btn m-0 mt-1 float-right"> Previous </button>
          <button onClick={() => history.push(`/dashboard?date=${next(date)}`)} className="btn btn-outline-dark btn m-0 mt-1 float-right" >Next </button>
        </div>
        
      <div className="d-md-flex mb-3">
        <h4 className="mb-0">Reservations for: {date.slice(0,10)}</h4>        
      </div>
      <ErrorAlert error={reservationsError} />
      <ErrorAlert error={tablesError} />
      
      <ListRes reservations={reservations} date={date} />
      <ListTable tables={tables} handleFinish={handleFinish} />
      
    </main>
  );
}

export default Dashboard;