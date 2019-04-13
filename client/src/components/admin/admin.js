import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/core/styles";

import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import AppBar from "@material-ui/core/AppBar";
import CssBaseline from "@material-ui/core/CssBaseline";
import SideNav from "./drawer/drawer";
import ConsecutiveSnackbars from "./snackbar/snackbar";

import Login from "./login/login";
import Create from "./create/create";
import Manage from "./manage/manage";
import Results from "./results/results";

const drawerWidth = 240;

const styles = theme => ({
  root: {
    display: "flex"
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0
  },
  drawerPaper: {
    width: drawerWidth
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing.unit * 3
  },
  toolbar: theme.mixins.toolbar
});

class Admin extends Component {
  render() {
    const { token, page } = this.props.admin;
    const { classes } = this.props;

    let render, navigation;

    if (!token) {
      render = <Login />;
    } else {
      navigation = <SideNav />;
      render = "";
    }

    switch (page) {
      case "create":
        render = <Create />;
        break;
      case "manage":
        render = <Manage />;
        break;
      case "results":
        render = <Results />;
        break;
      default:
        console.log();
    }

    return (
      <div className={classes.root}>
        <CssBaseline />
        <AppBar position="fixed" className={classes.appBar}>
          <Toolbar>
            <Typography variant="h6" color="inherit" noWrap>
              Admin panel
            </Typography>
          </Toolbar>
        </AppBar>
        {navigation}
        <ConsecutiveSnackbars />;
        <main className={classes.content}>
          <div className={classes.toolbar} />
          {render}
        </main>
      </div>
    );
  }
}

Admin.propTypes = {
  classes: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  admin: state.admin,
  poll: state.poll
});

export default withStyles(styles)(connect(mapStateToProps)(Admin));
