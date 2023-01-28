import {
    ADD_NOTIFICATION,
    UPDATE_NOTIFICATION,
    DELETE_NOTIFICATION,
    FETCH_NOTIFICATION,
    FETCH_NOTIFICATION_SUCCESS,
    FETCH_NOTIFICATION_FAILURE,
    NOTIFICATION,
  } from "../actions/notificationActions";
  
  const initialState = {
    loading: true,
    error: null,
    data: null,
  };
  
  export function notificationReducer(state = initialState, action) {
    switch (action.type) {
  
      case FETCH_NOTIFICATION_SUCCESS:
        return {
          ...state,
          notification: {
            ...state.notification,
            data: action.payload,
          },
        };
  
  
  
      case ADD_NOTIFICATION:
        return {
          ...state,
          notification: {
            ...state.notification,
            data: action.payload,
          },
        };
  
        case UPDATE_NOTIFICATION:
        return {
          ...state,
          notification: {
            ...state.notification,
            data: action.payload,
          },
        };
  
        case NOTIFICATION:
        return {
          ...state,
          notification: {
            ...state.notification,
            data: action.payload,
          },
        };
  
        case DELETE_NOTIFICATION:
          return {
            ...state,
            notification: {
              ...state.notification,
              data: action.payload,
            },
          };
  
  
  
      default:
        return state;
    }
  }
  