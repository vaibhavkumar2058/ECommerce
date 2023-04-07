import {
    ADD_CUSTOM_TYPE,
    UPDATE_CUSTOM_TYPE,
    DELETE_CUSTOM_TYPE,
    FETCH_CUSTOM_TYPE,
    FETCH_CUSTOM_TYPE_SUCCESS,
    FETCH_CUSTOM_TYPE_FAILURE,
    CUSTOM_TYPE,
  } from "../actions/customTypeActions";
  
  const initialState = {
    loading: true,
    error: null,
    data: null,
  };
  
  export function customTypeReducer(state = initialState, action) {
    switch (action.type) {
  
      case FETCH_CUSTOM_TYPE_SUCCESS:
        return {
          ...state,
          customType: {
            ...state.customType,
            data: action.payload,
          },
        };
  
  
  
      case ADD_CUSTOM_TYPE:
        return {
          ...state,
          customType: {
            ...state.customType,
            data: action.payload,
          },
        };
  
        case UPDATE_CUSTOM_TYPE:
        return {
          ...state,
          customType: {
            ...state.customType,
            data: action.payload,
          },
        };
  
        case CUSTOM_TYPE:
        return {
          ...state,
          customType: {
            ...state.customType,
            data: action.payload,
          },
        };
  
        case DELETE_CUSTOM_TYPE:
          return {
            ...state,
            customType: {
              ...state.customType,
              data: action.payload,
            },
          };
  
      default:
        return state;
    }
  }
  