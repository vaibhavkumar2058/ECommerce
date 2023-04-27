import {
    ADD_LEAD,
    UPDATE_LEAD,
    DELETE_LEAD,
    FETCH_LEAD,
    FETCH_LEAD_SUCCESS,
    FETCH_LEAD_FAILURE,
    LEAD,
  } from "../actions/leadActions";
  
  const initialState = {
    loading: true,
    error: null,
    data: null,
  };
  
  export function leadReducer(state = initialState, action) {
    switch (action.type) {
  
      case FETCH_LEAD_SUCCESS:
        return {
          ...state,
          lead: {
            ...state.lead,
            data: action.payload,
          },
        };
  
  
  
      case ADD_LEAD:
        return {
          ...state,
          lead: {
            ...state.lead,
            data: action.payload,
          },
        };
  
        case UPDATE_LEAD:
        return {
          ...state,
          lead: {
            ...state.lead,
            data: action.payload,
          },
        };
  
        case LEAD:
        return {
          ...state,
          lead: {
            ...state.lead,
            data: action.payload,
          },
        };
  
        case DELETE_LEAD:
          return {
            ...state,
            lead: {
              ...state.lead,
              data: action.payload,
            },
          };
  
  
  
      default:
        return state;
    }
  }
  