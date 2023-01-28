import { combineReducers } from "redux";
import { enquiryReducer } from "./enquiryReducer";
import { notificationReducer } from "./notificationReducer";
import { orderReducer } from "./orderReducer";

export const reducers = combineReducers({
    enquiryReducer,
    notificationReducer,
    orderReducer
})