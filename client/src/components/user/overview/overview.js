import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import IconButton from "@material-ui/core/IconButton";
import Edit from "@material-ui/icons/Edit";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import {
  setPage,
  setCurrentPoll,
  getPolls
} from "../../../__actions/userAction";

const styles = theme => ({});

class Overview extends Component {
  state = {
    isButtonDisabled: false
  };
  handleClick = poll => {
    this.props.setCurrentPoll({ poll: poll });
    this.props.setPage({ page: "poll" });
  };

  refresh() {
    this.props.getPolls();
    this.setState({
      isButtonDisabled: true
    });
    setTimeout(() => this.setState({ isButtonDisabled: false }), 5000);
  }

  render() {
    const { classes } = this.props;
    const { polls } = this.props.user;
    let message;
    let list = polls.map((value, index) => (
      <ListItem key={index} role={undefined} dense button>
        <ListItemText primary={value.name} />
        <ListItemSecondaryAction>
          <IconButton
            aria-label="Comments"
            onClick={e => this.handleClick(value)}
          >
            <Edit fontSize="small" />
          </IconButton>
        </ListItemSecondaryAction>
      </ListItem>
    ));
    if (!polls.length > 0) {
      message = (
        <Typography variant="h6" color="inherit" noWrap>
          Currently there are no polls published
          <Button
            color="primary"
            className={classes.button}
            onClick={e => this.refresh()}
            disabled={this.state.isButtonDisabled}
          >
            Refresh
          </Button>
        </Typography>
      );
    }

    return (
      <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        style={{ minHeight: "50vh" }}
      >
        <List className={classes.root}>{list}</List>
        {message}
      </Grid>
    );
  }
}

Overview.propTypes = {
  classes: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  user: state.user
});

export default withStyles(styles)(
  connect(
    mapStateToProps,
    { setPage, setCurrentPoll, getPolls }
  )(Overview)
);
