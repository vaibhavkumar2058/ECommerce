import { combineReducers } from "redux";
import { enquiryReducer } from "./enquiryReducer";
import { addressReducer } from "./addressReducer";
import { addressTypeReducer } from "./addressTypeReducer";
import { cartReducer } from "./cartReducer";
import { recordStatusReducer } from "./recordStatusReducer";
import { resourceAttachmentsReducer } from "./resourceAttachmentsReducer";
import { categoryTypeReducer } from "./categoryTypeReducer";
import { productReducer } from "./productReducer";
import { fileReducer } from "./fileReducer";



export const reducers = combineReducers({
    enquiryReducer,
    recordStatusReducer,
    resourceAttachmentsReducer,
       productReducer,
    fileReducer,
    categoryTypeReducer

})