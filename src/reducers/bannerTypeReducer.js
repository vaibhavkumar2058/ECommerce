import {
    ADD_BANNER_TYPE,
    UPDATE_BANNER_TYPE,
    DELETE_BANNER_TYPE,
    FETCH_BANNER_TYPE,
    FETCH_BANNER_TYPE_SUCCESS,
    FETCH_BANNER_TYPE_FAILURE,
    BANNER_TYPE,
  } from "../actions/bannerTypeActions";
  
  const initialState = {
    loading: true,
    error: null,
    data: null,
  };
  
  export function addressTypeReducer(state = initialState, action) {
    switch (action.type) {
  
      case FETCH_BANNER_TYPE_SUCCESS:
        return {
          ...state,
          bannerType: {
            ...state.bannerType,
            data: action.payload,
          },
        };
  
  
  
      case ADD_BANNER_TYPE:
        return {
          ...state,
          bannerType: {
            ...state.bannerType,
            data: action.payload,
          },
        };
  
        case UPDATE_BANNER_TYPE:
        return {
          ...state,
          bannerType: {
            ...state.bannerType,
            data: action.payload,
          },
        };
  
        case BANNER_TYPE:
        return {
          ...state,
          bannerType: {
            ...state.bannerType,
            data: action.payload,
          },
        };
  
        case DELETE_BANNER_TYPE:
          return {
            ...state,
            bannerType: {
              ...state.bannerType,
              data: action.payload,
            },
          };
  
  
  
      default:
        return state;
    }
  }
  