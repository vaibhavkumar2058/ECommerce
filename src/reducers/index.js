import { combineReducers } from "redux";
import { enquiryReducer } from "./enquiryReducer";
import { countryReducer } from "./countryReducer";
import { genderReducer } from "./genderReducer";
import { gmtReducer } from "./gmtReducer";

export const reducers = combineReducers({
    enquiryReducer,
    countryReducer,
    genderReducer,
    gmtReducer
    
})