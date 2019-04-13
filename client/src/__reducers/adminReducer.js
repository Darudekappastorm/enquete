import {
  SET_USERDATA,
  SET_ERROR_MESSAGE,
  LOGIN,
  SET_PAGE
} from "../__actions/types";

const initialState = {
  username: "admin",
  password: "admin123",
  usernameError: { error: false, message: "" },
  passwordError: { error: false, message: "" },
  token: null,
  isFetching: false,
  page: "login"
};

export default function(state = initialState, action) {
  switch (action.type) {
    case SET_USERDATA:
      return {
        ...state,
        [action.payload.handle]: action.payload.value,
        usernameError: false,
        passwordError: false
      };
    case SET_ERROR_MESSAGE:
      return {
        ...state,
        [action.payload.handle]: {
          error: true,
          message: action.payload.message
        }
      };
    case LOGIN:
      return {
        ...state,
        token: action.payload.token
      };
    case SET_PAGE:
      return {
        ...state,
        page: action.payload.page
      };
    default:
      return state;
  }
}
