import { combineReducers } from "redux";
import { enquiryReducer } from "./enquiryReducer";
import { addressReducer } from "./addressReducer";
import { addressTypeReducer } from "./addressTypeReducer";
import { cartReducer } from "./cartReducer";
import { recordStatusReducer } from "./recordStatusReducer";
import { resourceAttachmentsReducer } from "./resourceAttachmentsReducer";
import { categoryTypeReducer } from "./categoryTypeReducer";
import { productReducer } from "./productReducer";
import{ folderReducer} from "./folderReducer"
import { fileReducer } from "./fileReducer";
import{GMTReducer}from "./GMTReducer";
import{orderTrackingReducer}from "./orderTrackingReducer";
import { resourcesReducer } from "./resourcesReducer";
import{orderStatusReducer}from "./orderStatusReducer";



export const reducers = combineReducers({
    enquiryReducer,
    recordStatusReducer,
    resourceAttachmentsReducer,
    productReducer,
    fileReducer,
    categoryTypeReducer,
    folderReducer,
    GMTReducer,
    orderTrackingReducer,
    resourcesReducer,
    orderStatusReducer

})