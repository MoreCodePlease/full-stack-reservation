import React, { useState, useEffect }from "react";
import { useHistory } from "react-router-dom";
import { createReservation, updateReservation } from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";
import { useParams } from "react-router-dom";
import formatReservationTime from "../utils/format-reservation-time";

function FormRes ({reserve, isNew}) {
  const {res_id} = useParams();
  const history = useHistory();
  const [formData, setFormData] = useState({});
  const [submitError, setSubmitError] = useState(null);
  
useEffect(() => {
  setFormData(reserve);
},[reserve])

  const handleChange = ({target}) => {
    const newVal =(target.name === "people")? Number(target.value): target.value;
    setFormData({...formData, [target.name]: newVal});
  };


  const handleSubmit = async (event) => {
    const abortController = new AbortController();
    event.preventDefault();
    if(isNew){
      try {
        const booking = await createReservation(formData, abortController.signal);
        history.push(`/dashboard/?date=${booking.reservation_date}`);
      } catch (error) {
        setSubmitError(error);
      }
      
    } else {
      try {
        const booking = await updateReservation(formData.reservation_id, formData, abortController.signal);
        history.push(`/dashboard/?date=${booking.reservation_date}`);
      } catch (error) {
        setSubmitError(error);
      }
    }
  }
  console.log(formData.reservation_time)
  return(
    <div>
      <ErrorAlert error={submitError} />
      <form onSubmit={handleSubmit}>
        <label htmlFor="first_name">First Name:</label>
        <input className="form-control"
          type="text"
          name="first_name"
          id="first_name"
          value={formData.first_name}
          onChange={handleChange}
          required
        />
        <label htmlFor="last_name">Last Name:</label>
        <input className="form-control"
          type="text"
          name="last_name"
          id="last_name"
          value={formData.last_name}
          onChange={handleChange}
          required
        />
        <label htmlFor="mobile_number">Callback Number:</label>
        <input className="form-control"
          type="tel"
          name="mobile_number"
          id="mobile_number"
          value={formData.mobile_number}
          onChange={handleChange}
          required
        />
        <label htmlFor="reservation_date">Reservation Date:</label>
        <input className="form-control"
          type="date"
          placeholder="YYYY-MM-DD"
          pattern="\d{4}-\d{2}-\d{2}"
          name="reservation_date"
          id="reservation_date"
          value={formData.reservation_date}
          onChange={handleChange}
          required
        />
        <label htmlFor="reservation_time">Reservation Time:</label>
        <input className="form-control"
          type="time"
          placeholder="HH:MM"
          pattern="[0-9]{2}:[0-9]{2}"
          name="reservation_time"
          id="reservation_time"
          value={formData.reservation_time}
          onChange={handleChange}
          required
        />
        <label htmlFor="people">Size of Party:</label>
        <input className="form-control"
          type="number"
          name="people"
          id="people"
          value={formData.people}
          onChange={handleChange}
          required
        />
        <br />
        <button type="submit" className="btn btn-primary" >
          Submit
        </button>
        <button  className="btn btn-default" onClick={() => history.push("/")} >
          Cancel
        </button>
      </form>
    </div>
  )
}

export default FormRes;