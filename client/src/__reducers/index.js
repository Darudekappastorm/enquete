import { combineReducers } from "redux";

import adminReducer from "./adminReducer";
import pollReducer from "./pollReducer";
import userReducer from "./userReducer";

export default combineReducers({
  admin: adminReducer,
  poll: pollReducer,
  user: userReducer
});
