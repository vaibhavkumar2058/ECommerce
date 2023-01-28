import { combineReducers } from "redux";
import { enquiryReducer } from "./enquiryReducer";
<<<<<<< HEAD
import { roleReducer } from "./roleReducer";

export const reducers = combineReducers({
    enquiryReducer,
    roleReducer
=======
import { categoryTypeReducer } from "./categoryTypeReducer";
import { productReducer } from "./productReducer";
import { fileReducer } from "./fileReducer";

export const reducers = combineReducers({
    enquiryReducer,
    productReducer,
    fileReducer,
    categoryTypeReducer
>>>>>>> master
})