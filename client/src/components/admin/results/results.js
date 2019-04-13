import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/core/styles";
import Item from "./item";
import { Typography } from "@material-ui/core";

const styles = theme => ({
  root: {
    width: "100%"
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular
  }
});

class Results extends Component {
  render() {
    const { results } = this.props.poll;
    let items = [];

    results.map((value, index) => {
      return items.push(
        <Item key={index} username={value.username} data={value.questions} />
      );
    });

    return (
      <Grid
        container
        spacing={0}
        direction="column"
        style={{ minHeight: "50vh" }}
      >
        <Typography variant="h6" color="inherit" noWrap>
          {results[0].name}
        </Typography>
        {items}
      </Grid>
    );
  }
}

const mapStateToProps = state => ({
  poll: state.poll
});

export default withStyles(styles)(connect(mapStateToProps)(Results));
