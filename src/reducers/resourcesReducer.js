import {
    ADD_RESOURCES,
    UPDATE_RESOURCES,
    DELETE_RESOURCES,
    FETCH_RESOURCES,
    FETCH_RESOURCES_SUCCESS,
    FETCH_RESOURCES_FAILURE,
    RESOURCES,
  } from "../actions/resourcesActions";
  
  const initialState = {
    loading: true,
    error: null,
    data: null,
  };
  
  export function resourcesReducer(state = initialState, action) {
    switch (action.type) {
  
      case FETCH_RESOURCES_SUCCESS:
        return {
          ...state,
          resources: {
            ...state.resources,
            data: action.payload,
          },
        };
  
  
  
      case ADD_RESOURCES:
        return {
          ...state,
          resources: {
            ...state.resources,
            data: action.payload,
          },
        };
  
        case UPDATE_RESOURCES:
        return {
          ...state,
          resources: {
            ...state.resources,
            data: action.payload,
          },
        };
  
        case RESOURCES:
        return {
          ...state,
          resources: {
            ...state.resources,
            data: action.payload,
          },
        };
  
        case DELETE_RESOURCES:
          return {
            ...state,
            resources: {
              ...state.resources,
              data: action.payload,
            },
          };
  
  
  
      default:
        return state;
    }
  }
  