import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";

import { connect } from "react-redux";

import Snackbar from "@material-ui/core/Snackbar";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";

import CircularProgress from "@material-ui/core/CircularProgress";

const styles = theme => ({
  close: {
    padding: theme.spacing.unit / 2
  },
  progress: {
    margin: theme.spacing.unit * 2
  }
});

class ConsecutiveSnackbars extends Component {
  state = {
    open: false
  };
  componentWillReceiveProps() {
    if (this.props.poll.isLoading) {
      this.setState({ open: true });
    }
  }

  handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    this.setState({ open: false });
  };

  render() {
    const { classes } = this.props;
    let loading = [];

    if (this.props.poll.snackbar === "saving...") {
      loading.push(<CircularProgress size={20} key="loading" />);
    }

    return (
      <div>
        <Snackbar
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "right"
          }}
          open={this.state.open}
          onClose={this.handleClose}
          ContentProps={{
            "aria-describedby": "message-id"
          }}
          autoHideDuration={2000}
          message={<span id="message-id">{this.props.poll.snackbar}</span>}
          action={[
            <React.Fragment key="test">
              {loading}
              <IconButton
                key="close"
                aria-label="Close"
                color="inherit"
                className={classes.close}
                onClick={this.handleClose}
              >
                <CloseIcon />
              </IconButton>
            </React.Fragment>
          ]}
        />
      </div>
    );
  }
}

ConsecutiveSnackbars.propTypes = {
  classes: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  poll: state.poll
});

export default withStyles(styles)(
  connect(mapStateToProps)(ConsecutiveSnackbars)
);
