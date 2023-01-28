import { combineReducers } from "redux";
import { enquiryReducer } from "./enquiryReducer";
import { roleReducer } from "./roleReducer";

export const reducers = combineReducers({
    enquiryReducer,
    roleReducer
})