import {
    ADD_BANNER,
    UPDATE_BANNER,
    DELETE_BANNER,
    FETCH_BANNER,
    FETCH_BANNER_SUCCESS,
    FETCH_BANNER_FAILURE,
    BANNER,
  } from "../actions/bannerActions";
  
  const initialState = {
    loading: true,
    error: null,
    data: null,
  };
  
  export function bannerReducer(state = initialState, action) {
    switch (action.type) {
  
      case FETCH_BANNER_SUCCESS:
        return {
          ...state,
          banner: {
            ...state.banner,
            data: action.payload,
          },
        };
  
  
  
      case ADD_BANNER:
        return {
          ...state,
          banner: {
            ...state.banner,
            data: action.payload,
          },
        };
  
        case UPDATE_BANNER:
        return {
          ...state,
          banner: {
            ...state.banner,
            data: action.payload,
          },
        };
  
        case BANNER:
        return {
          ...state,
          banner: {
            ...state.banner,
            data: action.payload,
          },
        };
  
        case DELETE_BANNERBANNER:
          return {
            ...state,
            banner: {
              ...state.banner,
              data: action.payload,
            },
          };
  
  
      default:
        return state;
    }
  }
  