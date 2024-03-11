import { combineReducers } from "redux";
import authReducer from "./auth";
import currentUserReducer from "./currentUser";
import questionReducer from "./questions";
import usersReducer from "./users";
import cardReducer from "./cards";
import paymentReducer from "./payment";

export default combineReducers({
  authReducer,
  currentUserReducer,
  questionReducer,
  usersReducer,
  cardReducer,
  paymentReducer,
});
