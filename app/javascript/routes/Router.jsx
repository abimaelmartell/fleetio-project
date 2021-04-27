import React from 'react';
import { BrowserRouter, Route, Switch } from "react-router-dom";

import Home from "../components/views/Home";

const Router = () => (
  <BrowserRouter>
    <Switch>
      <Route path="/" exact component={Home} />
    </Switch>
  </BrowserRouter>
);

export default Router;
