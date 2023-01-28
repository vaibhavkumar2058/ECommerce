import {
    ADD_ITEMCOST,
    UPDATE_ITEMCOST,
    DELETE_ITEMCOST,
    FETCH_ITEMCOST,
    FETCH_ITEMCOST_SUCCESS,
    FETCH_ITEMCOST_FAILURE,
    ITEMCOST,
  } from "../actions/itemcostActions";
  
  const initialState = {
    loading: true,
    error: null,
    data: null,
  };
  
  export function itemcostReducer(state = initialState, action) {
    switch (action.type) {
  
      case FETCH_ITEMCOST_SUCCESS:
        return {
          ...state,
          itemcost: {
            ...state.itemcost,
            data: action.payload,
          },
        };
  
  
  
      case ADD_ITEMCOST:
        return {
          ...state,
          itemcost: {
            ...state.itemcost,
            data: action.payload,
          },
        };
  
        case UPDATE_ITEMCOST:
        return {
          ...state,
          itemcost: {
            ...state.itemcost,
            data: action.payload,
          },
        };
  
        case ITEMCOST:
        return {
          ...state,
          itemcost: {
            ...state.itemcost,
            data: action.payload,
          },
        };
  
        case DELETE_ITEMCOST:
          return {
            ...state,
            itemcost: {
              ...state.itemcost,
              data: action.payload,
            },
          };
  
  
  
      default:
        return state;
    }
  }
  