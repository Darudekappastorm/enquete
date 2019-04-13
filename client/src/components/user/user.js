import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/core/styles";

import { setName, setPage, getPolls } from "../../__actions/userAction";

import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import AppBar from "@material-ui/core/AppBar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import Overview from "./overview/overview";
import Poll from "./poll/poll";

const styles = theme => ({
  root: {
    display: "flex"
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing.unit * 3
  },
  toolbar: theme.mixins.toolbar
});

class User extends Component {
  componentDidMount() {
    this.props.getPolls();
  }
  setName = e => {
    this.props.setName({ name: e.target.value });
  };

  continue = () => {
    this.props.setPage({ page: "overview" });
  };

  render() {
    const { classes } = this.props;
    const { name, page } = this.props.user;
    let render;

    switch (page) {
      case "overview":
        render = <Overview />;
        break;
      case "poll":
        render = <Poll />;
        break;

      default:
        render = (
          <Grid
            container
            spacing={0}
            direction="column"
            alignItems="center"
            style={{ minHeight: "50vh" }}
          >
            <TextField
              id="standard-name"
              label="Name"
              className={classes.textField}
              onChange={e => this.setName(e)}
              value={name}
              margin="normal"
              autoComplete="off"
              multiline={true}
            />
            <Button
              color="primary"
              className={classes.button}
              disabled={name ? false : true}
              onClick={() => this.continue(name)}
            >
              Continue
            </Button>
          </Grid>
        );
    }

    return (
      <div className={classes.root}>
        <CssBaseline />
        <AppBar position="fixed" className={classes.appBar}>
          <Toolbar>
            <Typography variant="h6" color="inherit" noWrap>
              Enquête
            </Typography>
          </Toolbar>
        </AppBar>

        <main className={classes.content}>
          <div className={classes.toolbar} />
          {render}
        </main>
      </div>
    );
  }
}

User.propTypes = {
  classes: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  user: state.user
});

export default withStyles(styles)(
  connect(
    mapStateToProps,
    { setName, setPage, getPolls }
  )(User)
);
