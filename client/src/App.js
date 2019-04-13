import React, { Component } from "react";

import AppRouter from "./components/appRouter";

class App extends Component {
  state = {};
  render() {
    return (
      <React.Fragment>
        <AppRouter />
      </React.Fragment>
    );
  }
}

export default App;
