import {
    ADD_GMT,
    UPDATE_GMT,
    DELETE_GMT,
    FETCH_GMT,
    FETCH_GMT_SUCCESS,
    FETCH_GMT_FAILURE,
    GMT,
  } from "../actions/gmtActions";
  
  const initialState = {
    loading: true,
    error: null,
    data: null,
  };
  
  export function gmtReducer(state = initialState, action) {
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
  