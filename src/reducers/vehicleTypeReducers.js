import {
    ADD_VEHICLETYPE,
    UPDATE_VEHICLETYPE,
    DELETE_VEHICLETYPE,
    FETCH_VEHICLETYPE,
    FETCH_VEHICLETYPE_SUCCESS,
    FETCH_VEHICLETYPE_FAILURE,
    VEHICLETYPE,
  } from "../actions/vehicleTypeActions";
  
  const initialState = {
    loading: true,
    error: null,
    data: null,
  };
  
  export function vehicleTypeReducer(state = initialState, action) {
    switch (action.type) {
  
      case FETCH_VEHICLETYPE_SUCCESS:
        return {
          ...state,
          vehicleType: {
            ...state.vehicleType,
            data: action.payload,
          },
        };
  
  
  
      case ADD_VEHICLETYPE:
        return {
          ...state,
          vehicleType: {
            ...state.vehicleType,
            data: action.payload,
          },
        };
  
        case UPDATE_VEHICLETYPE:
        return {
          ...state,
          vehicleType: {
            ...state.vehicleType,
            data: action.payload,
          },
        };
  
        case VEHICLETYPE:
        return {
          ...state,
          vehicleType: {
            ...state.vehicleType,
            data: action.payload,
          },
        };
  
        case DELETE_VEHICLETYPE:
          return {
            ...state,
            vehicleType: {
              ...state.vehicleType,
              data: action.payload,
            },
          };
  
  
  
      default:
        return state;
    }
  }
  