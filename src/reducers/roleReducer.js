import {
    ADD_ROLE,
    UPDATE_ROLE,
    DELETE_ROLE,
    FETCH_ROLE,
    FETCH_ROLE_SUCCESS,
    FETCH_ROLE_FAILURE,
    ROLE,
  } from "../actions/roleActions";
  
  const initialState = {
    loading: true,
    error: null,
    data: null,
  };
  
  export function roleReducer(state = initialState, action) {
    switch (action.type) {
  
      case FETCH_ROLE_SUCCESS:
        return {
          ...state,
          role: {
            ...state.role,
            data: action.payload,
          },
        };
  
  
  
      case ADD_ROLE:
        return {
          ...state,
          role: {
            ...state.role,
            data: action.payload,
          },
        };
  
        case UPDATE_ROLE:
        return {
          ...state,
          role: {
            ...state.role,
            data: action.payload,
          },
        };
  
        case ROLE:
        return {
          ...state,
          role: {
            ...state.role,
            data: action.payload,
          },
        };
  
        case DELETE_ROLE:
          return {
            ...state,
            role: {
              ...state.role,
              data: action.payload,
            },
          };
  
  
  
      default:
        return state;
    }
  }
  