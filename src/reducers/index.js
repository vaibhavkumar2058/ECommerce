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
import{gmtReducer}from "./gmtReducer";
import{orderTrackingReducer}from "./orderTrackingReducer";
import { resourcesReducer } from "./resourcesReducer";
import{orderStatusReducer}from "./orderStatusReducer";
import { loginReducer } from "./loginUtilityReducer";




export const reducers = combineReducers({
    enquiryReducer,
    recordStatusReducer,
    resourceAttachmentsReducer,
    productReducer,
    fileReducer,
    categoryTypeReducer,
    folderReducer,
    gmtReducer,
    orderTrackingReducer,
   loginReducer,
    resourcesReducer,
    orderStatusReducer

})