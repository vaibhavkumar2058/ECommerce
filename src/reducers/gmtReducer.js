import {
    ADD_GMT,
    UPDATE_GMT,
    DELETE_GMT,
    FETCH_GMT,
    FETCH_GMT_SUCCESS,
    FETCH_ENQUIRY_GMT,
    GMT,
  } from "../actions/GMTActions";
  
  const initialState = {
    loading: true,
    error: null,
    data: null,
  };
  
  export function GMTReducer(state = initialState, action) {
    switch (action.type) {
  
      case FETCH_GMT_SUCCESS:
        return {
          ...state,
          GMT: {
            ...state.GMT,
            data: action.payload,
          },
        };
  
  
  
      case ADD_GMT:
        return {
          ...state,
          GMT: {
            ...state.GMT,
            data: action.payload,
          },
        };
  
        case UPDATE_GMT:
        return {
          ...state,
          gGMTmt: {
            ...state.GMT,
            data: action.payload,
          },
        };
  
        case GMT:
        return {
          ...state,
          GMT: {
            ...state.GMT,
            data: action.payload,
          },
        };
  
        case DELETE_GMT:
          return {
            ...state,
            GMT: {
              ...state.GMT,
              data: action.payload,
            },
          };
  
  
  
      default:
        return state;
    }
  }
  