import React, { useState }from "react";
import { useHistory } from "react-router-dom";
import { createTable } from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";


function FormTable () {
  const history = useHistory();
  const initTable = {table_name: "",capacity:""};
  const [formData, setFormData] = useState({...initTable});
  const [errorTable, setErrorTable] = useState(false);


  const handleChange = ({target}) => {
    const newVal =(target.name === "capacity")? Number(target.value): target.value;
    setFormData({...formData, [target.name]: newVal});
  };

  const handleSubmit = async (event) => {
    const abortController = new AbortController();
    event.preventDefault();
    try {
      await createTable(formData, abortController.signal);
      history.push(`/dashboard`);
    } catch (error) {
      setErrorTable(error);
    }
  }

  return (
    <div>
      <ErrorAlert error={errorTable} />
      <form onSubmit={handleSubmit}>
        <label htmlFor="table_name">Table Name:<input className="form-control"
          type="text"
          name="table_name"
          id="table_name"
          value={formData.table_name}
          onChange={handleChange}
          required
        />
        </label>
        <br />
        <label htmlFor="capacity">Capacity:
        <input className="form-control"
          type="number"
          name="capacity"
          id="capacity"
          min="1"
          value={formData.capacity}
          onChange={handleChange}
          required
        /></label>
        
        <br />
        <button 
          type="submit" 
          className="btn btn-sm btn-outline-primary"
          > Submit </button>
        <button
          className="btn btn-sm btn-outline-secondary"
          onClick={() => history.goBack()}
        > Cancel </button>
      </form>
    </div>
  )
}

export default FormTable;
