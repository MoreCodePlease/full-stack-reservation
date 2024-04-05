import React, { useState } from "react";
import ErrorAlert from "../layout/ErrorAlert";
import { finishTable } from "../utils/api";
import { useHistory } from "react-router-dom";

function ListTable({tables}) {
  const history = useHistory();
  const [errorTable, setErrorTable] = useState(false);

  async function handleFinish(target) {
    const abortController = new AbortController();
    try {
      await finishTable(target.table_id, abortController.signal);
    } catch (error) {
      setErrorTable(error);
    }
    history.push("/");
  }
  console.log(tables)
  const list = tables.map((item,index) => {
    return (
    <tr key = {index}>
      <td>{item.table_id}</td>
      <td>{item.table_name}</td>
      <td>{item.capacity}</td>
      <td>{(item.reservation_id)? "Occupied": "Free"}</td>
      <td>{(item.reservation_id)? item.reservation_id: ""}</td>
      <td>{(item.reservation_id)? (<button
          onClick={() => handleFinish(item)}
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