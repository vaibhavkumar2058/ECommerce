import {
    ADD_STATE,
    UPDATE_STATE,
    DELETE_STATE,
    FETCH_STATE,
    FETCH_STATE_SUCCESS,
    FETCH_STATE_FAILURE,
    STATE,
  } from "../actions/stateActions";
  
  const initialState = {
    loading: true,
    error: null,
    data: null,
  };
  
  export function stateReducer(state = initialState, action) {
    switch (action.type) {
  
      case FETCH_STATE_SUCCESS:
        return {
          ...state,
          state: {
            ...state.state,
            data: action.payload,
          },
        };
  
  
  
      case ADD_STATE:
        return {
          ...state,
          state: {
            ...state.state,
            data: action.payload,
          },
        };
  
        case UPDATE_STATE:
        return {
          ...state,
          state: {
            ...state.state,
            data: action.payload,
          },
        };
  
        case STATE:
        return {
          ...state,
        state: {
            ...state.state,
            data: action.payload,
          },
        };
  
        case DELETE_STATE:
          return {
            ...state,
            state: {
              ...state.state,
              data: action.payload,
            },
          };
  
  
  
      default:
        return state;
    }
  }
  