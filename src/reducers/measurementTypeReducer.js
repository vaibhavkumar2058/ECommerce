import {
    ADD_MEASUREMENTTYPE,
    UPDATE_MEASUREMENTTYPE,
    DELETE_MEASUREMENTTYPE,
    FETCH_MEASUREMENTTYPE,
    FETCH_MEASUREMENTTYPE_SUCCESS,
    FETCH_MEASUREMENTTYPE_FAILURE,
    MEASUREMENTTYPE,
  } from "../actions/measurementTypeActions";
  
  const initialState = {
    loading: true,
    error: null,
    data: null,
  };
  
  export function measurementTypeReducer(state = initialState, action) {
    switch (action.type) {
  
      case FETCH_MEASUREMENTTYPE_SUCCESS:
        return {
          ...state,
          measurementType: {
            ...state.measurementType,
            data: action.payload,
          },
        };
  
  
  
      case ADD_MEASUREMENTTYPE:
        return {
          ...state,
          measurementType: {
            ...state.measurementType,
            data: action.payload,
          },
        };
  
        case UPDATE_MEASUREMENTTYPE:
        return {
          ...state,
          measurementType: {
            ...state.measurementType,
            data: action.payload,
          },
        };
  
        case MEASUREMENTTYPE:
        return {
          ...state,
          measurementType: {
            ...state.measurementType,
            data: action.payload,
          },
        };
  
        case DELETE_MEASUREMENTTYPE:
          return {
            ...state,
            measurementType: {
              ...state.measurementType,
              data: action.payload,
            },
          };
  
  
  
      default:
        return state;
    }
  }
  