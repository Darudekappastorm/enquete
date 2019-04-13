import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import User from "./user/user";
import Admin from "./admin/admin";

class AppRouter extends Component {
  state = {};
  render() {
    const routes = (
      <React.Fragment>
        <Route path="/" exact component={User} />
        <Route path="/admin/" component={Admin} />
      </React.Fragment>
    );
    return <Router>{routes}</Router>;
  }
}

export default AppRouter;
