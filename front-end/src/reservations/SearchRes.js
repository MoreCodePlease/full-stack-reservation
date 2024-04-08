import React, { useState } from "react";
import ErrorAlert from "../layout/ErrorAlert";
import { searchReservation } from "../utils/api";
import ListRes from "./ListRes";
import { useHistory } from "react-router-dom";


function SearchRes() {
  const [formData, setFormData] = useState({mobile_number:""});
  const [searchError, setSearchError] = useState(false);
  const [subResult, setSubResult] = useState(false);
  const [searchResult, setSearchResult] = useState([]);
  const history = useHistory();

  const handleChange = ({target}) => {  
    setFormData({...formData, [target.name]: target.value});
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const mobile_number = formData.mobile_number;
      const result = await searchReservation(mobile_number.replace(/-/g, ''));
      setSubResult(true);
      setSearchResult(result);
      console.log(result);
    } catch (error) {
      setSearchError(error);
    }
  }

  return (
    <div>
      <ErrorAlert error = {searchError} />
      <div>
        <h2>Search by Mobile Number</h2>
      </div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="mobile_number">Mobile Number</label>
        <input className="form-control"
          type="text"
          name="mobile_number"
          id="mobile_number"
          placeholder="Enter a customer's mobile number"
          onChange={handleChange}
          required
          value={formData.mobile_number}
        />
        <button className="btn btn-primary" type="submit">Submit</button>
        <button className="btn btn-secondary" type="button" onClick={() => history.goBack()}>Cancel</button>
      </form>
      <div>
        {(subResult && searchResult.length !== 0)? <ListRes reservations={searchResult}/>: null}
        {(subResult && searchResult.length === 0)? `No reservations found`:null}
      </div>
    </div>
  )
}

export default SearchRes;