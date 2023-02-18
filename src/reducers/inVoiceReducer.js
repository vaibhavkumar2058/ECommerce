import {
    ADD_INVOICE,
    UPDATE_INVOICE,
    DELETE_INVOICE,
    FETCH_INVOICE,
    FETCH_INVOICE_SUCCESS,
    FETCH_INVOICE_FAILURE,
    INVOICE,
  } from "../actions/inVoiceActions";
  
  const initialState = {
    loading: true,
    error: null,
    data: null,
  };
  
  export function inVoiceReducer(state = initialState, action) {
    switch (action.type) {
  
      case FETCH_INVOICE_SUCCESS:
        return {
          ...state,
          inVoice: {
            ...state.inVoice,
            data: action.payload,
          },
        };
  
  
  
      case ADD_INVOICE:
        return {
          ...state,
          inVoice: {
            ...state.inVoice,
            data: action.payload,
          },
        };
  
        case UPDATE_INVOICE:
        return {
          ...state,
          inVoice: {
            ...state.inVoice,
            data: action.payload,
          },
        };
  
        case INVOICE:
        return {
          ...state,
          inVoice: {
            ...state.inVoice,
            data: action.payload,
          },
        };
  
        case DELETE_INVOICE:
          return {
            ...state,
            inVoice: {
              ...state.inVoice,
              data: action.payload,
            },
          };
  
  
  
      default:
        return state;
    }
  }
  