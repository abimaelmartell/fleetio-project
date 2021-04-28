import React from 'react';
import { BrowserRouter, Route, Switch } from "react-router-dom";

import Home from "../components/Home";
import SingleVehicle from "../components/SingleVehicle";

const Router = () => (
  <BrowserRouter>
    <Switch>
      <Route path="/" exact component={Home} />
      <Route path="/vehicle/:id" exact component={SingleVehicle} />
    </Switch>
  </BrowserRouter>
);

export default Router;
