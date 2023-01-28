import {
    ADD_ADDRESS,
    UPDATE_ADDRESS,
    DELETE_ADDRESS,
    FETCH_ADDRESS,
    FETCH_ADDRESS_SUCCESS,
    FETCH_ADDRESS_FAILURE,
    ADDRESS,
  } from "../actions/addressActions";
  
  const initialState = {
    loading: true,
    error: null,
    data: null,
  };
  
  export function addressReducer(state = initialState, action) {
    switch (action.type) {
  
      case FETCH_ADDRESS_SUCCESS:
        return {
          ...state,
          address: {
            ...state.address,
            data: action.payload,
          },
        };
  
  
  
      case ADD_ADDRESS:
        return {
          ...state,
          address: {
            ...state.address,
            data: action.payload,
          },
        };
  
        case UPDATE_ADDRESS:
        return {
          ...state,
          address: {
            ...state.address,
            data: action.payload,
          },
        };
  
        case ADDRESS:
        return {
          ...state,
          address: {
            ...state.address,
            data: action.payload,
          },
        };
  
        case DELETE_ADDRESS:
          return {
            ...state,
            address: {
              ...state.address,
              data: action.payload,
            },
          };
  
  
  
      default:
        return state;
    }
  }
  