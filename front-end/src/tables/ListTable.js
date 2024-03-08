import React from "react";


function ListTable({tables}) {
  const list = tables.map((table,index) => {
    <tr key = {index}>
      <td>{table.table_id}</td>
      <td>{table.table_name}</td>
      <td>{table.capacity}</td>
      <td>{(table.reservation_id)? "Occupied": "Free"}</td>
      <td><button>Finish</button></td>
    </tr>
  })


  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Table Id</th>
            <th>Table Name</th>
            <th>Capacity</th>
            <th>Table Status</th>
            <th>Reservation Id</th>
            <th></th>
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