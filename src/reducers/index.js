import { combineReducers } from "redux";
import { enquiryReducer } from "./enquiryReducer";
import { recordStatusReducer } from "./recordStatusReducer";
import { resourceAttachmentsReducer } from "./resourceAttachmentsReducer";


export const reducers = combineReducers({
    enquiryReducer,
    recordStatusReducer,
    resourceAttachmentsReducer
})