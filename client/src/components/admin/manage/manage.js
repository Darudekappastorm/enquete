import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/core/styles";
import Item from "./item";
import { getPolls } from "../../../__actions/pollAction";

const styles = theme => ({});

class Manage extends Component {
  componentWillMount() {
    this.props.getPolls();
  }

  handler = () => {
    this.props.getPolls();
  };

  render() {
    const { polls } = this.props.poll;
    const list = [];

    polls.map((poll, index) => {
      return list.push(
        <Item key={index} data={poll} id={poll._id} handler={this.handler} />
      );
    });

    return (
      <Grid
        container
        spacing={0}
        direction="column"
        style={{ minHeight: "50vh" }}
      >
        {list}
      </Grid>
    );
  }
}

const mapStateToProps = state => ({
  poll: state.poll,
  admin: state.admin
});

export default withStyles(styles)(
  connect(
    mapStateToProps,
    { getPolls }
  )(Manage)
);
