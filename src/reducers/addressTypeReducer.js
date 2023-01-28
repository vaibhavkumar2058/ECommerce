import {
    ADD_ADDRESS_TYPE,
    UPDATE_ADDRESS_TYPE,
    DELETE_ADDRESS_TYPE,
    FETCH_ADDRESS_TYPE,
    FETCH_ADDRESS_TYPE_SUCCESS,
    FETCH_ADDRESS_TYPE_FAILURE,
    ADDRESS_TYPE,
  } from "../actions/addressTypeActions";
  
  const initialState = {
    loading: true,
    error: null,
    data: null,
  };
  
  export function addressTypeReducer(state = initialState, action) {
    switch (action.type) {
  
      case FETCH_ADDRESS_TYPE_SUCCESS:
        return {
          ...state,
          addressType: {
            ...state.addressType,
            data: action.payload,
          },
        };
  
  
  
      case ADD_ADDRESS_TYPE:
        return {
          ...state,
          addressType: {
            ...state.addressType,
            data: action.payload,
          },
        };
  
        case UPDATE_ADDRESS_TYPE:
        return {
          ...state,
          addressType: {
            ...state.addressType,
            data: action.payload,
          },
        };
  
        case ADDRESS_TYPE:
        return {
          ...state,
          addressType: {
            ...state.addressType,
            data: action.payload,
          },
        };
  
        case DELETE_ADDRESS_TYPE:
          return {
            ...state,
            addressType: {
              ...state.addressType,
              data: action.payload,
            },
          };
  
  
  
      default:
        return state;
    }
  }
  