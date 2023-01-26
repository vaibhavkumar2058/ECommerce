import {
    ADD_ENQUIRY,
    UPDATE_ENQUIRY,
    DELETE_ENQUIRY,
    FETCH_ENQUIRY,
    FETCH_ENQUIRY_SUCCESS,
    FETCH_ENQUIRY_FAILURE,
    ENQUIRY,
  } from "../actions/enquiryActions";
  
  const initialState = {
    loading: true,
    error: null,
    data: null,
  };
  
  export function enquiryReducer(state = initialState, action) {
    switch (action.type) {
  
      case FETCH_ENQUIRY_SUCCESS:
        return {
          ...state,
          enquiry: {
            ...state.enquiry,
            data: action.payload,
          },
        };
  
  
  
      case ADD_ENQUIRY:
        return {
          ...state,
          enquiry: {
            ...state.enquiry,
            data: action.payload,
          },
        };
  
        case UPDATE_ENQUIRY:
        return {
          ...state,
          enquiry: {
            ...state.enquiry,
            data: action.payload,
          },
        };
  
        case ENQUIRY:
        return {
          ...state,
          enquiry: {
            ...state.enquiry,
            data: action.payload,
          },
        };
  
        case DELETE_ENQUIRY:
          return {
            ...state,
            enquiry: {
              ...state.enquiry,
              data: action.payload,
            },
          };
  
  
  
      default:
        return state;
    }
  }
  