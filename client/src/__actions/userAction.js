import {
  SET_NAME,
  SET_PAGE_USER,
  SET_LOADING_USER,
  SET_POLLS_USER,
  SET_CURRENT_POLL,
  SET_CURRENT_QUESTION,
  SET_USER_ANSWER,
  CLEAR_STATE
} from "./types";

export const setName = data => dispatch => {
  dispatch({
    type: SET_NAME,
    payload: data
  });
};

export const setPage = data => dispatch => {
  dispatch({
    type: SET_PAGE_USER,
    payload: data
  });
};

export const setLoading = data => dispatch => {
  dispatch({
    type: SET_LOADING_USER,
    payload: data
  });
};

export const setCurrentQuestion = data => dispatch => {
  dispatch({
    type: SET_CURRENT_QUESTION,
    payload: data
  });
};

export const getPolls = data => dispatch => {
  dispatch(setLoading({ isLoading: true }));
  fetch("http://localhost:9000/api/admin/getAllPolls", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      query: { status: "online" }
    })
  })
    .then(res => res.json())
    .then(data => {
      dispatch(setLoading({ isLoading: false }));
      if (data.errors) {
        return console.log(data.errors);
      }
      const questions = data.map((value, index) => {
        value.questions.map((question, index) => {
          return (question.answer = "");
        });
        return value;
      });

      dispatch({
        type: SET_POLLS_USER,
        payload: questions
      });
    })

    .catch(err => {
      dispatch(setLoading({ isLoading: false }));
      console.log(err);
    });
};

export const setCurrentPoll = data => dispatch => {
  dispatch({
    type: SET_CURRENT_POLL,
    payload: data
  });
};

export const setUserAnswer = data => dispatch => {
  dispatch({
    type: SET_USER_ANSWER,
    payload: data
  });
};

export const savePoll = data => dispatch => {
  dispatch(setLoading({ isLoading: true }));
  fetch("http://localhost:9000/api/admin/handInPoll", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      poll: data
    })
  })
    .then(res => res.json())
    .then(data => {
      dispatch(setLoading({ isLoading: false }));
      if (data.errors) {
        return console.log(data.errors);
      }
      dispatch({
        type: CLEAR_STATE,
        payload: ""
      });
      // dispatch(setPage({ page: "overview" }));
    })
    .catch(err => {
      dispatch(setLoading({ isLoading: false }));
      console.log(err);
    });
};
