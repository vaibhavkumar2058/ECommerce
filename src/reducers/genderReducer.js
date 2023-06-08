import {
    ADD_GENDER,
    UPDATE_GENDER,
    DELETE_GENDER,
    FETCH_GENDER,
    FETCH_GENDER_SUCCESS,
    FETCH_GENDER_FAILURE,
    GENDER,
  } from "../actions/genderActions";
  
  const initialState = {
    loading: true,
    error: null,
    data: null,
  };
  
  export function genderReducer(state = initialState, action) {
    switch (action.type) {
  
      case FETCH_GENDER_SUCCESS:
        return {
          ...state,
          gender: {
            ...state.gender,
            data: action.payload,
          },
        };
  
  
  
      case ADD_GENDER:
        return {
          ...state,
          gender: {
            ...state.gender,
            data: action.payload,
          },
        };
  
        case UPDATE_GENDER:
        return {
          ...state,
          gender: {
            ...state.gender,
            data: action.payload,
          },
        };
  
        case GENDER:
        return {
          ...state,
          gender: {
            ...state.gender,
            data: action.payload,
          },
        };
  
        case DELETE_GENDER:
          return {
            ...state,
            gender: {
              ...state.gender,
              data: action.payload,
            },
          };
          
      default:
        return state;
    }
  }
  