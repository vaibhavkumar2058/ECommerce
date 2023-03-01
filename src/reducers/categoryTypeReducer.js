import {
    ADD_CATEGORYTYPE,
    UPDATE_CATEGORYTYPE,
    DELETE_CATEGORYTYPE,
    FETCH_CATEGORYTYPE,
    FETCH_CATEGORYTYPE_SUCCESS,
    FETCH_CATEGORYTYPE_FAILURE,
    CATEGORYTYPE,
  } from "../actions/categoryTypeActions";
  
  const initialState = {
    loading: true,
    error: null,
    data: null,
  };
  
  export function categoryTypeReducer(state = initialState, action) {
    switch (action.type) {
  
      case FETCH_CATEGORYTYPE_SUCCESS:
        return {
          ...state,
          categoryType: {
            ...state.categoryType,
            data: action.payload,
          },
        };  
  
      case ADD_CATEGORYTYPE:
        return {
          ...state,
          categoryType: {
            ...state.categoryType,
            data: action.payload,
          },
        };
  
        case UPDATE_CATEGORYTYPE:
        return {
          ...state,
          categoryType: {
            ...state.categoryType,
            data: action.payload,
          },
        };
  
        case CATEGORYTYPE:
        return {
          ...state,
          categoryType: {
            ...state.categoryType,
            data: action.payload,
          },
        };
  
        case DELETE_CATEGORYTYPE:
          return {
            ...state,
            categoryType: {
              ...state.categoryType,
              data: action.payload,
            },
          };
  
  
  
      default:
        return state;
    }
  }
  