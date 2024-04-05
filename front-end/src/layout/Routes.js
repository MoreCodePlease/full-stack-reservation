import React from "react";

import { Redirect, Route, Switch } from "react-router-dom";
import Dashboard from "../dashboard/Dashboard";
import NotFound from "./NotFound";
import { today } from "../utils/date-time";
import useQuery from "../utils/useQuery";
import NewRes from "../reservations/NewRes";
import EditRes from "../reservations/EditRes";
import NewTable from "../tables/NewTable";
import SearchRes from "../reservations/SearchRes"
import SeatRes from "../reservations/SeatRes";

/**
 * Defines all the routes for the application.
 *
 * You will need to make changes to this file.
 *
 * @returns {JSX.Element}
 */
function Routes() {

  let date = useQuery().get("date");
  console.log(date);
  if (!date) date = today();
  
  return (
    <Switch>
      <Route exact={true} path="/">
        <Redirect to={"/dashboard"} />
      </Route>
      <Route exact={true} path="/reservations">
        <Redirect to={"/dashboard"} />
      </Route>
       <Route path="/dashboard">
        <Dashboard date={date} />
      </Route>
      <Route exact={true} path="/reservations/new" >
        <NewRes />
      </Route>
      <Route exact={true} path="/reservations/:reservation_id/seat">
        <SeatRes />
      </Route>
      <Route exact={true} path="/reservations/:reservation_id/edit">
        <EditRes />
      </Route>
      <Route exact={true} path="/tables/new">
        <NewTable />
      </Route>
      <Route exact={true} path="/search">
      </Route>
      <Route>
        <NotFound />
      </Route>
    </Switch>
  );
}

export default Routes;
