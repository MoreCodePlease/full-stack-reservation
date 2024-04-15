import React from "react";

function ListTable({tables, handleFinish }) {

  const list = tables.map((table,index) => {
    return (
    <tr key = {table.table_id}>
      <td>{table.table_name}</td>
      <td>{table.capacity}</td>
      <td data-table-id-status={table.table_id}>{(table.reservation_id)? "occupied": "free"}</td>
      <td>{(table.reservation_id)? (<button
          data-table-id-finish={table.table_id}
          className="btn btn-outline-secondary"
          onClick={() => handleFinish(table.table_id)}
          >Finish</button>): null}
        </td>
    </tr>
    )
  })

  return (
    <div>
      <table className="table table-bordered table-striped">
        <thead className="thead-dark">
          <tr>
            <th>Table Name</th>
            <th>Capacity</th>
            <th>Table Status</th>
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