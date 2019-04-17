import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import classNames from "classnames";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelActions from "@material-ui/core/ExpansionPanelActions";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Button from "@material-ui/core/Button";
import Divider from "@material-ui/core/Divider";

import {
  setPollStatus,
  getPollResults,
  deletePollAndResults,
  editPoll
} from "../../../__actions/pollAction";
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
  },
  online: {
    color: "green"
  },
  offline: {
    color: "red"
  }
});
const setupPoll = async (id, status, setPollStatus, handler, userToken) => {
  let command = "online";

  if (status === "online") {
    command = "offline";
  }

  const result = await setPollStatus(id, command, userToken);
  if (result) {
    handler();
  }
};

const editPollData = (data, editPoll) => {
  let sanitze = {
    name: data.name,
    questions: data.questions,
    _id: data._id
  };
  editPoll(sanitze);
};

function DetailedExpansionPanel(props) {
  const {
    classes,
    id,
    data,
    setPollStatus,
    getPollResults,
    handler,
    deletePollAndResults,
    editPoll,
    admin
  } = props;

  const { name, status, completed } = data;
  let showStatus;

  if (status === "online") {
    showStatus = <Typography className={classes.online}>{status}</Typography>;
  } else {
    showStatus = <Typography className={classes.offline}>{status}</Typography>;
  }

  return (
    <div className={classes.root}>
      <ExpansionPanel defaultExpanded={false}>
        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
          <div className={classes.column}>
            <Typography className={classes.heading}>{name}</Typography>
          </div>
          <div className={classes.column}>{showStatus}</div>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails className={classes.details}>
          <div className={classes.column}>
            <Button
              color={status !== "online" ? "primary" : "secondary"}
              className={classes.button}
              onClick={e =>
                setupPoll(id, status, setPollStatus, handler, admin.token)
              }
            >
              {status !== "online" ? "publish" : "takedown"}
            </Button>
          </div>
          <Button
            color="primary"
            className={classes.button}
            disabled={completed === 0 ? true : false}
            onClick={e => getPollResults(id, admin.token)}
          >
            Results
          </Button>
          <div className={classes.column} />
          <div className={classNames(classes.column, classes.helper)}>
            <Typography variant="caption">
              Completed:
              <br />
              {completed}
            </Typography>
          </div>
        </ExpansionPanelDetails>
        <Divider />
        <ExpansionPanelActions>
          <Button
            size="small"
            color="secondary"
            onClick={e => {
              if (
                window.confirm(
                  "Are you sure you want to delete this poll and all the results?"
                )
              ) {
                deletePollAndResults(id, admin.token);
              }
            }}
          >
            Delete
          </Button>
          <Button
            size="small"
            color="primary"
            onClick={e => editPollData(data, editPoll)}
          >
            Edit
          </Button>
        </ExpansionPanelActions>
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
      getPollResults,
      deletePollAndResults,
      editPoll
    }
  )(DetailedExpansionPanel)
);
