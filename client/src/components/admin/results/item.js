import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

import Divider from "@material-ui/core/Divider";

import { setPollStatus, getPollResults } from "../../../__actions/pollAction";
import { connect } from "react-redux";

const styles = theme => ({
  root: {
    width: "100%",
    margin: theme.spacing.unit * 0.4
  },
  heading: {
    fontSize: theme.typography.pxToRem(15)
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary
  },
  icon: {
    verticalAlign: "bottom",
    height: 20,
    width: 20
  },
  details: {
    alignItems: "center"
  },
  column: {
    flexBasis: "33.33%"
  },
  helper: {
    borderLeft: `2px solid ${theme.palette.divider}`,
    padding: `${theme.spacing.unit}px ${theme.spacing.unit * 2}px`
  },
  link: {
    color: theme.palette.primary.main,
    textDecoration: "none",
    "&:hover": {
      textDecoration: "underline"
    }
  }
});

function DetailedExpansionPanel(props) {
  const { classes, username, data } = props;
  let question = [];

  data.map((value, index) => {
    return question.push(
      <ExpansionPanelDetails key={index} className={classes.details}>
        <div className={classes.column}>{value.value}</div>
        <div className={classes.column}>{value.answer}</div>
      </ExpansionPanelDetails>
    );
  });

  return (
    <div className={classes.root}>
      <ExpansionPanel defaultExpanded={false}>
        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
          <div className={classes.column}>
            <Typography className={classes.heading}>
              {username.toUpperCase()}
            </Typography>
          </div>
          <div className={classes.column} />
        </ExpansionPanelSummary>
        {question}

        <Divider />
      </ExpansionPanel>
    </div>
  );
}

DetailedExpansionPanel.propTypes = {
  classes: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  admin: state.admin,
  poll: state.poll
});

export default withStyles(styles)(
  connect(
    mapStateToProps,
    {
      setPollStatus,
      getPollResults
    }
  )(DetailedExpansionPanel)
);
