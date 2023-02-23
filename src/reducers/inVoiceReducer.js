import {
    ADD_INVOICE,
    UPDATE_INVOICE,
    DELETE_INVOICE,
    FETCH_INVOICE,
    FETCH_INVOICE_SUCCESS,
    FETCH_INVOICE_FAILURE,
    INVOICE,
  } from "../actions/invoiceActions";
  
  const initialState = {
    loading: true,
    error: null,
    data: null,
  };
  
  export function inioiceReducer(state = initialState, action) {
    switch (action.type) {
  
      case FETCH_INVOICE_SUCCESS:
        return {
          ...state,
          invoice: {
            ...state.invoice,
            data: action.payload,
          },
        };
  
  
  
      case ADD_INVOICE:
        return {
          ...state,
          invoice: {
            ...state.invoice,
            data: action.payload,
          },
        };
  
        case UPDATE_INVOICE:
        return {
          ...state,
          invoice: {
            ...state.invoice,
            data: action.payload,
          },
        };
  
        case INVOICE:
        return {
          ...state,
          invoice: {
            ...state.invoice,
            data: action.payload,
          },
        };
  
        case DELETE_INVOICE:
          return {
            ...state,
            invoice: {
              ...state.invoice,
              data: action.payload,
            },
          };
  
  
  
      default:
        return state;
    }
  }
  