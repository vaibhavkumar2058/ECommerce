import { combineReducers } from "redux";
import { enquiryReducer } from "./enquiryReducer";
import { measurementType} from "./measurementTypeReducer";
import { measuremnetValue} from "./measurementValueReducer"

export const reducers = combineReducers({
    enquiryReducer,
    measurementType,
    measuremnetValue
})