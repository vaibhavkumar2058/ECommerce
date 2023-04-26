import {
    ADD_BOX,
    UPDATE_BOX,
    DELETE_BOX,
    FETCH_BOX,
    FETCH_BOX_SUCCESS,
    FETCH_BOX_FAILURE,
    BOX,
  } from "../actions/boxActions";
  
  const initialState = {
    loading: true,
    error: null,
    data: null,
  };
  
  export function boxReducer(state = initialState, action) {
    switch (action.type) {
  
      case FETCH_BOX_SUCCESS:
        return {
          ...state,
          box: {
            ...state.box,
            data: action.payload,
          },
        };
  
  
  
      case ADD_BOX:
        return {
          ...state,
          box: {
            ...state.box,
            data: action.payload,
          },
        };
  
        case UPDATE_BOX:
        return {
          ...state,
          box: {
            ...state.box,
            data: action.payload,
          },
        };
  
        case BOX:
        return {
          ...state,
          box: {
            ...state.box,
            data: action.payload,
          },
        };
  
        case DELETE_BOX:
          return {
            ...state,
            box: {
              ...state.box,
              data: action.payload,
            },
          };
  
  
      default:
        return state;
    }
  }
  