import React, { useState }from "react";
import { useHistory } from "react-router-dom";
import { createTable } from "../utils/api";


function FormTable () {
  const history = useHistory();
  const initTable = {table_name: "",capacity:""};
  const [formData, setFormData] = useState({...initTable});
  const [error, setError] = useState(undefined);


  const handleChange = ({target}) => {
    const newVal =(target.name === "capacity")? Number(target.value): target.value;
    setFormData({...formData, [target.name]: newVal});
  };

  const handleSubmit = async (event) => {
    const abortController = new AbortController();
    event.preventDefault();
    try {
      const table = await createTable(formData, abortController.signal);
      history.push(`/dashboard`);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="table_name">Table Name:</label>
        <input className="form-control"
          type="text"
          name="table_name"
          id="table_name"
          value={formData.table_name}
          onChange={handleChange}
          required
        />
        <label htmlFor="capacity">Capacity:</label>
        <input className="form-control"
          type="number"
          name="capacity"
          id="capacity"
          value={formData.capacity}
          onChange={handleChange}
          required
        />
        <br />
        <button> Submit </button>
        <button> Cancel </button>
      </form>
    </div>
  )

}

export default FormTable;
