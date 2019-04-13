import React, { Component } from "react";

import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";

import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";

import { connect } from "react-redux";
import {
  setUserData,
  setErrorMessage,
  attemptLogin
} from "../../../__actions/adminActions";

const styles = theme => ({
  form: {
    display: "flex",
    flexWrap: "wrap",
    width: 300
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: "100%"
  },
  button: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: "100%"
  }
});

class Login extends Component {
  userInput = event => {
    const { name, value } = event.target;
    this.props.setUserData({ handle: name, value: value });
  };

  enterPressed(event) {
    var code = event.keyCode || event.which;
    const { username, password } = this.props.admin;
    if (code === 13) {
      this.attemptLogin(username, password);
    }
  }

  attemptLogin = (username, password) => {
    const passed = this.checkInput(username, password);

    if (!passed) {
      return;
    }

    this.props.attemptLogin(username, password);
  };

  checkInput = (username, password) => {
    if (username.length < 5) {
      this.props.setErrorMessage({
        message: "Username has to be at least 5 characters",
        handle: "usernameError"
      });
      return false;
    }

    if (password.length < 5) {
      this.props.setErrorMessage({
        message: "Password has to be at least 5 characters",
        handle: "passwordError"
      });
      return false;
    }
    return true;
  };

  render() {
    const {
      username,
      password,
      usernameError,
      passwordError
    } = this.props.admin;
    const { classes } = this.props;

    return (
      <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justify="center"
        style={{ minHeight: "50vh" }}
      >
        <form className={classes.form}>
          <TextField
            label="Username"
            error={usernameError.error}
            helperText={usernameError.message}
            className={classes.textField}
            type="text"
            name="username"
            margin="normal"
            variant="outlined"
            value={username}
            onChange={e => this.userInput(e)}
            onKeyPress={this.enterPressed.bind(this)}
          />

          <TextField
            label="Password"
            helperText={passwordError.message}
            error={passwordError.error}
            className={classes.textField}
            type="password"
            name="password"
            margin="normal"
            variant="outlined"
            value={password}
            onChange={e => this.userInput(e)}
            onKeyPress={this.enterPressed.bind(this)}
          />
          <Button
            variant="contained"
            color="secondary"
            className={classes.button}
            onClick={e => this.attemptLogin(username, password)}
          >
            Sign in
          </Button>
        </form>
      </Grid>
    );
  }
}

Login.propTypes = {
  classes: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  admin: state.admin
});

export default withStyles(styles)(
  connect(
    mapStateToProps,
    { setUserData, setErrorMessage, attemptLogin }
  )(Login)
);
