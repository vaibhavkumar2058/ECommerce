import { combineReducers } from "redux";
import { enquiryReducer } from "./enquiryReducer";
import { addressReducer } from "./addressReducer";
import { addressTypeReducer } from "./addressTypeReducer";
import { cartReducer } from "./cartReducer";

export const reducers = combineReducers({
    enquiryReducer,
    addressReducer,
    addressTypeReducer,
    cartReducer
})