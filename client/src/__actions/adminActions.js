import { SET_USERDATA, SET_ERROR_MESSAGE, LOGIN, SET_PAGE } from "./types";

export const setUserData = data => dispatch => {
  //Save the username/password to the state
  dispatch({
    type: SET_USERDATA,
    payload: data
  });
};

export const setErrorMessage = data => dispatch => {
  dispatch({
    type: SET_ERROR_MESSAGE,
    payload: data
  });
};

export const attemptLogin = (username, password) => dispatch => {
  //API request to check if userdata is correct
  fetch("http://localhost:9000/api/admin/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      handle: username,
      password: password
    })
  })
    .then(res => res.json())
    .then(data => {
      if (data.errors) {
        return dispatch({
          type: SET_ERROR_MESSAGE,
          payload: { message: data.errors[0].message, handle: "passwordError" }
        });
      }
      dispatch({
        type: LOGIN,
        payload: data
      });
    })
    .catch(err => {
      console.log(err);
    });
};

export const navigate = data => dispatch => {
  dispatch({
    type: SET_PAGE,
    payload: data
  });
};
