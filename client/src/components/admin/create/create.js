import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";

import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import Switch from "@material-ui/core/Switch";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";

import {
  handleQuestion,
  setInput,
  createEmptyQuestion,
  handleCheckbox,
  handleMultipleChoice,
  addMultipleChoiceInput,
  setSnackbarMessage,
  savePoll
} from "../../../__actions/pollAction";

import { navigate } from "../../../__actions/adminActions";
import { connect } from "react-redux";

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
    flexGrow: 1
  },
  buttonNav: {
    display: "flex",
    width: "100%"
  },
  rb: {
    margin: 10
  },
  savePoll: {
    alignSelf: "start",
    marginRight: theme.spacing.unit
  }
});

class Create extends Component {
  handleCheckBox = name => event => {
    this.props.handleCheckbox({ multipleChoice: event.target.checked });
  };

  handleQuestion = value => {
    if (
      this.props.poll.questions[this.props.poll.question + value] === undefined
    ) {
      this.props.createEmptyQuestion({});
    }

    this.props.handleQuestion({
      value: value,
      currentQuestion: this.props.poll.question + value,
      questions: this.props.poll.questions
    });
  };

  handleMultipleChoice = e => {
    const { name, value } = e.target;
    this.props.handleMultipleChoice({
      name: name,
      value: value
    });
  };

  createAdditionalMultipleChoiceInput = e => {
    const currentQuestion = this.props.poll.question;
    this.props.addMultipleChoiceInput({
      currentQuestion: currentQuestion
    });
  };

  handleChange = e => {
    const { name, value } = e.target;

    if (name === "name") {
      return this.props.setInput({ handle: "name", value: value });
    }

    this.props.setInput({ handle: name, value: value });
  };

  save = () => {
    this.props.setSnackbarMessage({ message: "Saving..." });
    this.props.savePoll(this.props.poll, this.props.admin.token);
  };

  render() {
    const { classes } = this.props;
    const { question, name, questions, multipleChoice } = this.props.poll;

    let buttons, boxes, title;
    let input = [];

    buttons = (
      <React.Fragment>
        <Button
          variant="contained"
          color="primary"
          className={classes.button}
          onClick={e => this.handleQuestion(-1)}
        >
          prev
        </Button>
        <Button
          variant="contained"
          color="primary"
          className={classes.button}
          onClick={e => this.handleQuestion(+1)}
          disabled={
            question === 0
              ? true
              : questions[question - 1].value === ""
              ? true
              : false
          }
        >
          Next
        </Button>
      </React.Fragment>
    );

    if (question === 0) {
      buttons = (
        <Button
          variant="contained"
          color="primary"
          className={classes.button}
          onClick={e => this.handleQuestion(+1)}
          disabled={name === "" ? true : false}
        >
          Next
        </Button>
      );
    }

    switch (question) {
      case 0:
        input.push(
          <TextField
            key="100"
            label="Poll name"
            className={classes.textField}
            type="text"
            name="name"
            value={name}
            margin="normal"
            variant="outlined"
            autoComplete="off"
            onChange={e => this.handleChange(e)}
            multiline={true}
          />
        );
        break;
      default:
        input.push(
          <React.Fragment key="200">
            <Switch
              key="300"
              checked={multipleChoice}
              onChange={this.handleCheckBox("checked")}
              value="checked"
              color="primary"
            />

            <TextField
              key="400"
              label="Question"
              className={classes.textField}
              type="text"
              name={question.toString()}
              margin="normal"
              value={questions[question - 1].value}
              variant="outlined"
              autoComplete="off"
              onChange={e => this.handleChange(e)}
              multiline={true}
            />
          </React.Fragment>
        );

        if (questions[question - 1].mc) {
          const mc = questions[question - 1].mc;

          mc.map((value, index) => {
            return input.push(
              <TextField
                key={index}
                label={"option" + (index + 1)}
                className={classes.textField}
                type="text"
                name={index.toString()}
                margin="normal"
                value={value.value}
                variant="filled"
                autoComplete="off"
                onChange={e => this.handleMultipleChoice(e)}
                multiline={true}
              />
            );
          });
        }
    }

    if (multipleChoice) {
      boxes = (
        <React.Fragment>
          <div className={classes.rb}>
            <Fab
              size="small"
              color="secondary"
              aria-label="Add"
              className={classes.margin}
            >
              <AddIcon
                onClick={e => this.createAdditionalMultipleChoiceInput()}
              />
            </Fab>
          </div>
        </React.Fragment>
      );
    }

    title = (
      <Typography variant="h4" gutterBottom>
        Create a new poll
      </Typography>
    );

    if (name) {
      title = (
        <Typography variant="h4" gutterBottom>
          Poll: {name}
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
        {title}
        <Typography variant="subheading" gutterBottom>
          Question {question}
        </Typography>

        <form className={classes.form}>
          {input.map(value => {
            return value;
          })}
          {boxes}
          <div className={classes.buttonNav}>{buttons}</div>
        </form>
        <div className={classes.savePoll}>
          <Button
            variant="contained"
            color="secondary"
            className={classes.button}
            onClick={e => this.save()}
            disabled={
              question === 0
                ? true
                : questions[question - 1].value === ""
                ? true
                : false
            }
          >
            Save
          </Button>
        </div>
      </Grid>
    );
  }
}

Create.propTypes = {
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
      handleQuestion,
      setInput,
      createEmptyQuestion,
      handleCheckbox,
      handleMultipleChoice,
      addMultipleChoiceInput,
      setSnackbarMessage,
      navigate,
      savePoll
    }
  )(Create)
);
