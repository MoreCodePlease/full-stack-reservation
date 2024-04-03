import React from "react";
import { useHistory } from "react-router-dom";
import FormTable from "./FormTable";
import { createTable } from "../utils/api";


function NewTable() {

  return (
    <div>
      <div>
        <h1>New Table</h1>
      </div>
      <div>
        <FormTable />
      </div>
    </div>
  )
}

export default NewTable;