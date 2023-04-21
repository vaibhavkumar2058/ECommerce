import {
    ADD_DISCOUNTTYPE,
    UPDATE_DISCOUNTTYPE,
    DELETE_DISCOUNTTYPE,
    FETCH_DISCOUNTTYPE,
    FETCH_DISCOUNTTYPE_SUCCESS,
    FETCH_DISCOUNTTYPE_FAILURE,
    DISCOUNTTYPE,
  } from "../actions/discountTypeActions";
  
  const initialState = {
    loading: true,
    error: null,
    data: null,
  };
  
  export function discountTypeReducer(state = initialState, action) {
    switch (action.type) {
  
      case FETCH_DISCOUNTTYPE_SUCCESS:
        return {
          ...state,
          discountType: {
            ...state.discountType,
            data: action.payload,
          },
        };
  
  
  
      case ADD_DISCOUNTTYPE:
        return {
          ...state,
          discountType: {
            ...state.discountType,
            data: action.payload,
          },
        };
  
        case UPDATE_DISCOUNTTYPE:
        return {
          ...state,
          discountType: {
            ...state.discountType,
            data: action.payload,
          },
        };
  
        case DISCOUNTTYPE:
        return {
          ...state,
          discountType: {
            ...state.discountType,
            data: action.payload,
          },
        };
  
        case DELETE_DISCOUNTTYPE:
          return {
            ...state,
            discountType: {
              ...state.discountTypediscountType,
              data: action.payload,
            },
          };
  
  
      default:
        return state;
    }
  }
  