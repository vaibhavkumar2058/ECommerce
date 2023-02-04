import {
    ADD_ORDERTRACKING,
    UPDATE_ORDERTRACKING,
    DELETE_ORDERTRACKING,
    FETCH_ORDERTRACKING,
    FETCH_ORDERTRACKING_SUCCESS,
    FETCH_ORDERTRACKING_FAILURE,
    ORDERTRACKING,
  } from "../actions/orderTrackingActions";
  
  const initialState = {
    loading: true,
    error: null,
    data: null,
  };
  
  export function orderTrackingReducer(state = initialState, action) {
    switch (action.type) {
  
      case FETCH_ORDERTRACKING_SUCCESS:
        return {
          ...state,
          orderTracking: {
            ...state.orderTracking,
            data: action.payload,
          },
        };
  
  
  
      case ADD_ORDERTRACKING:
        return {
          ...state,
          orderTracking: {
            ...state.orderTracking,
            data: action.payload,
          },
        };
  
        case UPDATE_ORDERTRACKING:
        return {
          ...state,
          orderTracking: {
            ...state.orderTracking,
            data: action.payload,
          },
        };
  
        case ORDERTRACKING:
        return {
          ...state,
          orderTracking: {
            ...state.orderTracking,
            data: action.payload,
          },
        };
  
        case DELETE_ORDERTRACKING:
          return {
            ...state,
            orderTracking: {
              ...state.orderTracking,
              data: action.payload,
            },
          };
  
  
  
      default:
        return state;
    }
  }
  