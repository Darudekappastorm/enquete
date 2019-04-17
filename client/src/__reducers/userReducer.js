import {
  SET_NAME,
  SET_PAGE_USER,
  SET_LOADING_USER,
  SET_POLLS_USER,
  SET_CURRENT_POLL,
  SET_CURRENT_QUESTION,
  SET_USER_ANSWER,
  CLEAR_STATE
} from "../__actions/types";
import produce from "immer";

const initialState = {
  name: "stef",
  page: "home",
  polls: [],
  currentPoll: {},
  currentQuestion: 0,
  isLoading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case SET_NAME:
      return { ...state, name: action.payload.name };
    case SET_PAGE_USER:
      return {
        ...state,
        page: action.payload.page
      };
    case SET_LOADING_USER:
      return {
        ...state,
        isLoading: action.payload.isLoading
      };
    case SET_POLLS_USER:
      return {
        ...state,
        polls: action.payload
      };
    case SET_CURRENT_POLL:
      return {
        ...state,
        currentPoll: {
          ...action.payload.poll,
          totalQuestions: action.payload.poll.questions.length
        }
      };
    case SET_CURRENT_QUESTION:
      return {
        ...state,
        currentQuestion: state.currentQuestion + action.payload.value
      };
    case SET_USER_ANSWER:
      console.log(action.payload.other);
      return produce(state, draftState => {
        draftState.currentPoll.questions[
          action.payload.currentQuestion
        ].answer = action.payload.value;
        draftState.currentPoll.questions[action.payload.currentQuestion].other =
          action.payload.other;
      });
    case CLEAR_STATE:
      return {
        ...state,
        page: "overview",
        currentPoll: {},
        currentQuestion: 0
      };
    default:
      return state;
  }
}
