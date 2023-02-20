import {
    ADD_LOGIN,
    UPDATE_LOGIN,
    DELETE_LOGIN,
    FETCH_LOGIN,
    FETCH_LOGIN_SUCCESS,
    FETCH_LOGIN_FAILURE,
    LOGIN,
  } from "../actions/loginAction";
  
  const initialState = {
    loading: true,
    error: null,
    data: null,
  };
  
  export function loginReducer(state = initialState, action) {
    switch (action.type) {
  
      case FETCH_LOGIN_SUCCESS:
        return {
          ...state,
          login: {
            ...state.login,
            data: action.payload,
          },
        };
  
  
  
      case ADD_LOGIN:
        return {
          ...state,
          login: {
            ...state.login,
            data: action.payload,
          },
        };
  
        case UPDATE_LOGIN:
        return {
          ...state,
          login: {
            ...state.login,
            data: action.payload,
          },
        };
  
        case LOGIN:
        return {
          ...state,
          login: {
            ...state.login,
            data: action.payload,
          },
        };
  
        case DELETE_LOGIN:
          return {
            ...state,
            login: {
              ...state.login,
              data: action.payload,
            },
          };
  
  
  
      default:
        return state;
    }
  }
  