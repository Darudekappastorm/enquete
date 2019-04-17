import {
  SET_QUESTION,
  SET_POLL_INPUT,
  CREATE_NEW_QUESTION,
  CREATE_EMPTY_QUESTION,
  SET_CHECK_BOX,
  SET_MULTIPLE_CHOICE,
  ADD_MULTIPLE_CHOICE_INPUT,
  SET_SNACKBAR_MESSAGE,
  SET_LOADING,
  CLEAR_POLL,
  SET_POLLS,
  SET_RESULTS,
  EDIT_POLL
} from "./types";

import { navigate } from "./adminActions";

export const handleQuestion = data => dispatch => {
  if (
    data.questions[data.currentQuestion - 1] === undefined &&
    data.currentQuestion !== 0
  ) {
    //Create a new question
    dispatch({
      type: CREATE_NEW_QUESTION,
      payload: { index: data.currentQuestion - 1 }
    });
  }
  dispatch({
    type: SET_QUESTION,
    payload: data
  });
};

export const handleMultipleChoice = data => dispatch => {
  dispatch({
    type: SET_MULTIPLE_CHOICE,
    payload: data
  });
};

export const addMultipleChoiceInput = data => dispatch => {
  dispatch({
    type: ADD_MULTIPLE_CHOICE_INPUT,
    payload: data
  });
};

export const setInput = data => dispatch => {
  dispatch({
    type: SET_POLL_INPUT,
    payload: data
  });
};

export const createEmptyQuestion = data => dispatch => {
  dispatch({
    type: CREATE_EMPTY_QUESTION,
    payload: data
  });
};

export const handleCheckbox = data => dispatch => {
  dispatch({
    type: SET_CHECK_BOX,
    payload: data
  });
};

export const setSnackbarMessage = data => dispatch => {
  dispatch({
    type: SET_SNACKBAR_MESSAGE,
    payload: data
  });
};

export const clearPoll = () => dispatch => {
  dispatch({
    type: CLEAR_POLL,
    payload: ""
  });
};

export const savePoll = (data, userToken) => dispatch => {
  dispatch(setLoading({ isLoading: true }));
  const { name, questions } = data;

  let removeEmpty = questions.filter(question => {
    return question.value !== "";
  });

  const poll = {
    name: name,
    questions: removeEmpty
  };

  fetch("http://localhost:9000/api/admin/createPoll", {
    method: "POST",
    headers: { "Content-Type": "application/json", authorization: userToken },
    body: JSON.stringify({
      data: poll
    })
  })
    .then(res => res.json())
    .then(data => {
      dispatch(setLoading({ isLoading: false }));

      if (data.errors) {
        dispatch(setSnackbarMessage({ message: data.errors[0].message }));
        return;
      }
      dispatch(clearPoll());
      dispatch(navigate({ page: "manage" }));
    })
    .catch(err => {
      dispatch(setLoading({ isLoading: false }));
      console.log(err);
    });
};

const setLoading = data => dispatch => {
  dispatch({
    type: SET_LOADING,
    payload: data
  });
};

const setPolls = data => dispatch => {
  dispatch({
    type: SET_POLLS,
    payload: data
  });
};

export const getPolls = () => dispatch => {
  fetch("http://localhost:9000/api/admin/getAllPolls", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      query: ""
    })
  })
    .then(res => res.json())
    .then(data => {
      if (data.errors) {
        console.log(data.errors);
        return;
      }
      dispatch(setPolls(data));
    })
    .catch(err => {
      console.log(err);
    });
};

export const setPollStatus = (id, command, userToken) => dispatch => {
  dispatch(setSnackbarMessage({ message: "Updating status..." }));
  dispatch(setLoading({ isLoading: true }));

  return fetch("http://localhost:9000/api/admin/editPoll", {
    method: "POST",
    headers: { "Content-Type": "application/json", authorization: userToken },
    body: JSON.stringify({
      id: id,
      command: command
    })
  })
    .then(res => res.json())
    .then(data => {
      dispatch(setLoading({ isLoading: false }));
      if (data.errors) {
        dispatch(setSnackbarMessage({ message: data.errors[0].message }));
        return;
      }

      return true;
    })
    .catch(err => {
      dispatch(setLoading({ isLoading: false }));
      console.log(err);
    });
};

export const getPollResults = (id, userToken) => dispatch => {
  dispatch(setSnackbarMessage({ message: "Loading..." }));
  dispatch(setLoading({ isLoading: true }));

  return fetch("http://localhost:9000/api/admin/getPollResults", {
    method: "POST",
    headers: { "Content-Type": "application/json", authorization: userToken },
    body: JSON.stringify({
      id: id
    })
  })
    .then(res => res.json())
    .then(data => {
      dispatch(setLoading({ isLoading: false }));
      if (data.errors) {
        dispatch(setSnackbarMessage({ message: data.errors[0].message }));
        return;
      }
      dispatch({
        type: SET_RESULTS,
        payload: data
      });
      dispatch(navigate({ page: "results" }));
    })
    .catch(err => {
      dispatch(setLoading({ isLoading: false }));
      console.log(err);
    });
};

export const deletePollAndResults = (id, userToken) => dispatch => {
  dispatch(setSnackbarMessage({ message: "Deleting poll and results..." }));
  dispatch(setLoading({ isLoading: true }));

  return fetch("http://localhost:9000/api/admin/deletePoll", {
    method: "POST",
    headers: { "Content-Type": "application/json", authorization: userToken },
    body: JSON.stringify({
      id: id
    })
  })
    .then(res => res.json())
    .then(data => {
      dispatch(setLoading({ isLoading: false }));
      if (data.errors) {
        dispatch(setSnackbarMessage({ message: data.errors[0].message }));
        return;
      }
      dispatch(getPolls());
    })
    .catch(err => {
      dispatch(setLoading({ isLoading: false }));
      console.log(err);
    });
};

export const editPoll = data => dispatch => {
  dispatch({
    type: EDIT_POLL,
    payload: data
  });
  dispatch(navigate({ page: "create" }));
};
