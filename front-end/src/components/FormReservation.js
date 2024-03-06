import React, { useState }from "react";
import { useHistory } from "react-router-dom";
import { createReservation } from "../utils/api";

function FormReservation ({reserve, isNew}) {
  const history = useHistory();
  const [formData, setFormData] = useState({...reserve});
  const [error, setError] = useState(undefined);
  
  const handleChange = ({target}) => {
    setFormData({...formData, [target.name]: target.value});
  };


  const handleSubmit = async (event) => {
    const abortController = new AbortController();
    event.preventDefault();
    if(isNew){
      try {
        const booking = await createReservation(formData, abortController.signal);
        history.push(`/dashboard/?date=${booking.reservation_date}`);
      } catch (error) {
        console.log(error);
      }
      
    } else {
      const booking = await (formData, abortController.signal)
        history.push(`/dashboard/?date=${booking.reservation_date}`)
    }
  
  }


  return(
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="first_name">First Name:</label>
        <input 
        className="form-control"
        type="text"
        name="first_name"
        id="first_name"
        value={formData.first_name}
        onChange={handleChange}
        required
        />
        <label htmlFor="last_name">Last Name:</label>
        <input
          className="form-control"
          type="text"
          name="last_name"
          id="last_name"
          value={formData.last_name}
          onChange={handleChange}
          required
        />
        <label>Callback Number:</label>
        <input
          className="form-control"
          type="tel"
          name="mobile_number"
          id="mobile_number"
          value={formData.mobile_number}
          onChange={handleChange}
          required
        />
        <label>Reservation Date:</label>
        <input
          className="form-control"
          type="date"
          placeholder="YYYY-MM-DD"
          pattern="\d{4}-\d{2}-\d{2}"
          name="reservation_date"
          id="reservation_date"
          value={formData.reservation_date}
          onChange={handleChange}
          required
        />
        <label>Reservation Time:</label>
        <input
          className="form-control"
          type="time"
          placeholder="HH:MM"
          pattern="[0-9]{2}:[0-9]{2}"
          name="reservation_time"
          id="reservation_time"
          value={formData.reservation_time}
          onChange={handleChange}
          required
        />
        <label>Size of Party:</label>
        <input
          className="form-control"
          type="number"
          name="people"
          id="people"
          value={formData.people}
          onChange={handleChange}
          required
        />
        <br></br>
        <button
          type="submit"
          className="btn btn-primary"
        >
          Submit
        </button>
        <button
          className="btn btn-default"
          onClick={() => history.push("/")}  
        >
          Cancel
        </button>
      </form>
    </div>
  )
}

export default FormReservation;