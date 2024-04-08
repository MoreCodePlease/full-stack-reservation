import React, { useState } from "react";
import ErrorAlert from "../layout/ErrorAlert";
import { finishTable } from "../utils/api";
import { useHistory } from "react-router-dom";

function ListTable({tables, handleFinish }) {
  const history = useHistory();
  const [errorTable, setErrorTable] = useState(false);

  /*async function handleFinish(target) {
    const abortController = new AbortController();
    const confirmWindow = window.confirm("Is this table ready to seat new guests? This cannot be undone.");
    if(confirmWindow) {
      try {
        await finishTable(target.table_id, abortController.signal);
      } catch (error) {
        setErrorTable(error);
      }
      history.push("/");
    }
  }*/

  const list = tables.map((table,index) => {
    return (
    <tr key = {index}>
      <td>{table.table_id}</td>
      <td>{table.table_name}</td>
      <td>{table.capacity}</td>
      <td data-table-id-status={table.table_id}>{(table.reservation_id)? "occupied": "free"}</td>
      <td>{(table.reservation_id)? table.reservation_id: ""}</td>
      <td>{(table.reservation_id)? (<button
          data-table-id-finish={table.table_id}
          onClick={() => handleFinish(table.table_id)}
          >Finish</button>): null}
        </td>
    </tr>
    )
  })

  return (
    <div>
      <ErrorAlert error={errorTable} />
      <table className="table table-bordered table-striped">
        <thead className="thead-dark">
          <tr>
            <th>Table Id</th>
            <th>Table Name</th>
            <th>Capacity</th>
            <th>Table Status</th>
            <th>Reservation Id</th>
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


export default ListTable; 