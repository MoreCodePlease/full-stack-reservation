import React, { useEffect, useState } from "react";
import { seatTable, updateReservationStatus } from "../utils/api";
import { useHistory } from "react-router-dom";
import ErrorAlert from "../layout/ErrorAlert";

function FormSeat({tables, reservation_id}) {
  const history = useHistory();
  const [formData , setFormData] = useState(null);
  const [newError, setNewError] = useState(false);
  const [tableList, setTableList] = useState([])
  
  useEffect(() => {
    setTableList(tables);
  },[tables]);

  const handleChange = ({target}) => {
    setFormData(target.value)
  }

  const handleSubmit = async (event) => {
    const abortController = new AbortController();
    event.preventDefault();
    try {
      const response = await seatTable(reservation_id, formData, abortController.signal);
      response.status = "Occupied";
      await updateReservationStatus(reservation_id,"seated")
    } catch (error) {
      setNewError(error);
    }
    history.push("/dashboard");
  }
//
  const lastOptions = tableList.map((table, index) => {
    return (
      <option key={index} value={table.table_id} required={true}>
        {table.table_name} - {table.capacity}
      </option>)
  });
  return (
    <div>
      <ErrorAlert error={newError} />
      <form onSubmit={handleSubmit}>
        <label>Select Table:</label>
        <select name="table_id" onChange={handleChange}>
          <option value="">Table Name - Capacity</option>
          {lastOptions}
        </select>
        <div>
          <button
            className="btn btn-primary"
            type="submit"
          >Submit</button>
          <button
            className="btn btn-secondary"
            type="button"
            onClick={()=> history.goBack()}
          >Cancel</button>
        </div>
      </form>
    </div>
  )
}

export default FormSeat;