import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";

import {
  setPage,
  setCurrentQuestion,
  setUserAnswer,
  savePoll
} from "../../../__actions/userAction";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import Button from "@material-ui/core/Button";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";

const styles = theme => ({
  pollName: {
    marginBottom: theme.spacing.unit * 5
  },
  form: {
    display: "flex",
    flexWrap: "wrap",
    width: 300
  },
  group: {
    display: "flex",
    width: 300
  },
  formControl: {
    display: "flex",
    width: "100%"
  },
  buttonNav: {
    display: "flex",
    width: "100%"
  },
  button: {
    flexGrow: 1
  }
});

class Poll extends Component {
  handleQuestion = data => {
    this.props.setCurrentQuestion({ value: data });
  };

  setUserAnswer = (e, currentQuestion) => {
    const value = e.target.value;

    this.props.setUserAnswer({
      value: value,
      currentQuestion: currentQuestion
    });
  };

  saveCompletedPoll = () => {
    const user = this.props.user.name;
    const poll = this.props.user.currentPoll;

    const sanitize = {
      _id: poll._id,
      name: poll.name,
      questions: poll.questions,
      username: user
    };

    this.props.savePoll(sanitize);
  };

  setOtherAnswer = () => {
    console.log("Add inputfield");
  };

  render() {
    const { classes } = this.props;
    const { currentPoll, currentQuestion } = this.props.user;
    const { questions, totalQuestions } = currentPoll;
    const userAnswer = questions[currentQuestion].answer;
    let answer;
    let buttons = [];

    if (currentQuestion > 0) {
      buttons.push(
        <Button
          key="prev"
          variant="contained"
          color="primary"
          className={classes.button}
          onClick={e => this.handleQuestion(-1)}
        >
          prev
        </Button>
      );
    }
    if (currentQuestion + 1 === totalQuestions) {
      buttons.push(
        <Button
          key="save"
          variant="contained"
          color="primary"
          className={classes.button}
          onClick={e => this.saveCompletedPoll()}
          disabled={userAnswer !== "" ? false : true}
        >
          Save
        </Button>
      );
    } else {
      buttons.push(
        <Button
          key="next"
          variant="contained"
          color="primary"
          className={classes.button}
          onClick={e => this.handleQuestion(+1)}
          disabled={userAnswer !== "" ? false : true}
        >
          Next
        </Button>
      );
    }

    if (questions[currentQuestion].mc) {
      let content = [];
      answer = <RadioGroup className={classes.group}>{content}</RadioGroup>;

      questions[currentQuestion].mc.map((value, index) => {
        return content.push(
          <FormControlLabel
            value={value.value}
            control={
              <Radio
                color="primary"
                checked={userAnswer === value.value ? true : false}
              />
            }
            label={value.value}
            labelPlacement="end"
            onClick={e => this.setUserAnswer(e, currentQuestion)}
          />
        );
      });

      content.push(
        <FormControlLabel
          value="Other..."
          control={<Radio color="primary" />}
          label="Other..."
          labelPlacement="end"
          onClick={e => this.setOtherAnswer()}
        />
      );
    } else {
      answer = (
        <TextField
          id="standard-name"
          label="Answer"
          className={classes.textField}
          margin="normal"
          autoComplete="off"
          value={userAnswer}
          onChange={e => this.setUserAnswer(e, currentQuestion)}
          multiline={true}
        />
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
        <form className={classes.form}>
          <Typography variant="h4" className={classes.pollName} gutterBottom>
            {currentPoll.name}
          </Typography>
          <FormControl component="fieldset" className={classes.formControl}>
            <FormLabel component="legend">
              {questions[currentQuestion].value}
            </FormLabel>
            {answer}
            <div className={classes.buttonNav}>{buttons}</div>
          </FormControl>
        </form>
      </Grid>
    );
  }
}

Poll.propTypes = {
  classes: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  user: state.user
});

export default withStyles(styles)(
  connect(
    mapStateToProps,
    { setPage, setCurrentQuestion, setUserAnswer, savePoll }
  )(Poll)
);
