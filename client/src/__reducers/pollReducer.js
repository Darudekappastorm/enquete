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
} from "../__actions/types";
import produce from "immer";

const initialState = {
  name: "",
  questions: [
    {
      value: ""
    }
  ],
  question: 0,
  multipleChoice: false,
  snackbar: "",
  isLoading: false,
  polls: [],
  results: []
};

export default function(state = initialState, action) {
  switch (action.type) {
    case SET_QUESTION:
      if (action.payload.currentQuestion - 1 === -1) {
        return {
          ...state,
          question: state.question + action.payload.value,
          multipleChoice: false
        };
      }
      if (state.questions[action.payload.currentQuestion - 1].mc) {
        return {
          ...state,
          question: state.question + action.payload.value,
          multipleChoice: true
        };
      }
      return {
        ...state,
        question: state.question + action.payload.value,
        multipleChoice: false
      };

    case CREATE_EMPTY_QUESTION:
      return produce(state, draftState => {
        draftState.questions[state.question + 1] = {
          value: ""
        };
      });
    case SET_MULTIPLE_CHOICE:
      return produce(state, draftState => {
        draftState.questions[state.question - 1].mc[action.payload.name].value =
          action.payload.value;
      });
    case ADD_MULTIPLE_CHOICE_INPUT:
      return produce(state, draftState => {
        draftState.questions[action.payload.currentQuestion - 1].mc.push({
          value: ""
        });
      });

    case SET_POLL_INPUT:
      if (action.payload.handle === "name") {
        return { ...state, name: action.payload.value };
      }

      return produce(state, draftState => {
        draftState.questions[action.payload.handle - 1].value =
          action.payload.value;
      });

    case CREATE_NEW_QUESTION:
      return {
        ...state,
        questions: { ...state.questions }
      };
    case SET_CHECK_BOX:
      if (action.payload.multipleChoice) {
        return produce(state, draftState => {
          draftState.multipleChoice = action.payload.multipleChoice;
          draftState.questions[state.question - 1].mc = [
            {
              value: ""
            }
          ];
        });
      }
      return produce(state, draftState => {
        draftState.multipleChoice = action.payload.multipleChoice;
        draftState.questions[state.question - 1].mc = [];
      });
    case SET_SNACKBAR_MESSAGE:
      return { ...state, snackbar: action.payload.message };
    case SET_LOADING:
      return { ...state, isLoading: action.payload.isLoading };
    case CLEAR_POLL:
      return { ...initialState, snackbar: state.snackbar };
    case SET_POLLS:
      return {
        ...state,
        polls: action.payload
      };
    case SET_RESULTS:
      return {
        ...state,
        results: action.payload
      };
    case EDIT_POLL:
      return {
        ...state,
        name: action.payload.name,
        questions: action.payload.questions,
        action: "edit"
      };
    default:
      return state;
  }
}
