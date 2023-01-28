import {
    ADD_MEASUREMENTVALUE,
    UPDATE_MEASUREMENTVALUE,
    DELETE_MEASUREMENTVALUE,
    FETCH_MEASUREMENTVALUE,
    FETCH_MEASUREMENTVALUE_SUCCESS,
    FETCH_MEASUREMENTVALUE_FAILURE,
    MEASUREMENTVALUE,
  } from "../actions/measurementValueActions";
  
  const initialState = {
    loading: true,
    error: null,
    data: null,
  };
  
  export function measurementValueReducer(state = initialState, action) {
    switch (action.type) {
  
      case FETCH_MEASUREMENTVALUE_SUCCESS:
        return {
          ...state,
          measurementValue: {
            ...state.measurementValue,
            data: action.payload,
          },
        };
  
  
  
      case ADD_MEASUREMENTVALUE:
        return {
          ...state,
          measurementValue: {
            ...state.measurementValue,
            data: action.payload,
          },
        };
  
        case UPDATE_MEASUREMENTVALUE:
        return {
          ...state,
          measurementValue: {
            ...state.measurementValue,
            data: action.payload,
          },
        };
  
        case MEASUREMENTVALUE:
        return {
          ...state,
          measurementValue: {
            ...state.measurementValue,
            data: action.payload,
          },
        };
  
        case DELETE_MEASUREMENTVALUE:
          return {
            ...state,
            measurementValue: {
              ...state.measurementValue,
              data: action.payload,
            },
          };
  
  
  
      default:
        return state;
    }
  }
  