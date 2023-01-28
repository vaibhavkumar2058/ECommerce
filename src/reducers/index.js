import { combineReducers } from "redux";
import { enquiryReducer } from "./enquiryReducer";

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