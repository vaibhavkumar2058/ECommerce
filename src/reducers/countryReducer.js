import {
    ADD_COUNTRY,
    UPDATE_COUNTRY,
    DELETE_COUNTRY,
    FETCH_COUNTRY,
    FETCH_COUNTRY_SUCCESS,
    FETCH_COUNTRY_FAILURE,
    COUNTRY,
  } from "../actions/countryActions";
  
  const initialState = {
    loading: true,
    error: null,
    data: null,
  };
  
  export function countryReducer(state = initialState, action) {
    switch (action.type) {
  
      case FETCH_COUNTRY_SUCCESS:
        return {
          ...state,
          country: {
            ...state.country,
            data: action.payload,
          },
        };
  
  
  
      case ADD_COUNTRY:
        return {
          ...state,
          country: {
            ...state.country,
            data: action.payload,
          },
        };
  
        case UPDATE_COUNTRY:
        return {
          ...state,
          country: {
            ...state.country,
            data: action.payload,
          },
        };
  
        case COUNTRY:
        return {
          ...state,
          country: {
            ...state.country,
            data: action.payload,
          },
        };
  
        case DELETE_COUNTRY:
          return {
            ...state,
            country: {
              ...state.country,
              data: action.payload,
            },
          };
  
  
  
      default:
        return state;
    }
  }
  