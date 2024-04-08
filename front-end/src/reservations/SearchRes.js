import React, { useState } from "react";
import ErrorAlert from "../layout/ErrorAlert";
import { searchReservation } from "../utils/api";
import ListRes from "./ListRes";


function SearchRes() {
  const [formData, setFormData] = useState({mobile_number:""});
  const [searchError, setSearchError] = useState(false);
  const [subResult, setSubResult] = useState(false);
  const [searchResult, setSearchResult] = useState([]);

  const handleChange = ({target}) => {
    setFormData({...formData, [target.name]: target.value});
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const mobile_number = formData.mobile_number;
      const result = await searchReservation(mobile_number);
      setSubResult(true);
      setSearchResult(result);
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
      <div>
        {(subResult && searchResult.length <= 0)? <ListRes reservations={searchResult}/>: `No reservations found for mobile number: ${formData.mobile_number}`}
      </div>
    </div>
  )
}

export default SearchRes;