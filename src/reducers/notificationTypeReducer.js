import {
    ADD_NOTIFICATION_TYPE,
    UPDATE_NOTIFICATION_TYPE,
    DELETE_NOTIFICATION_TYPE,
    FETCH_NOTIFICATION_TYPE,
    FETCH_NOTIFICATION_TYPE_SUCCESS,
    FETCH_NOTIFICATION_TYPE_FAILURE,
    NOTIFICATION_TYPE,
  } from "../actions/notificationTypeActions";
  
  const initialState = {
    loading: true,
    error: null,
    data: null,
  };
  
  export function notificationTypeReducer(state = initialState, action) {
    switch (action.type) {
  
      case FETCH_NOTIFICATION_TYPE_SUCCESS:
        return {
          ...state,
          notificationType: {
            ...state.notificationType,
            data: action.payload,
          },
        };
  
  
  
      case ADD_NOTIFICATION_TYPE:
        return {
          ...state,
          notificationType: {
            ...state.notificationType,
            data: action.payload,
          },
        };
  
        case UPDATE_NOTIFICATION_TYPE:
        return {
          ...state,
          notificationType: {
            ...state.notificationType,
            data: action.payload,
          },
        };
  
        case NOTIFICATION_TYPE:
        return {
          ...state,
          notificationType: {
            ...state.notificationType,
            data: action.payload,
          },
        };
  
        case DELETE_NOTIFICATION_TYPE:
          return {
            ...state,
            notificationType: {
              ...state.notificationType,
              data: action.payload,
            },
          };
  
  
  
      default:
        return state;
    }
  }
  