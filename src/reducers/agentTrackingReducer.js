import {
  ADD_AGENTTRACKING,
  UPDATE_AGENTTRACKING,
  DELETE_AGENTTRACKING,
    FETCH_AGENTTRACKING,
    FETCH_AGENTTRACKING_SUCCESS,
    FETCH_AGENTTRACKING_FAILURE,
    AGENTTRACKING,
  } from "../actions/agentTrackingActions";

  const initialState = {
    loading: true,
    error: null,
    data: null, 
  };


  export function agentTrackingReducer(state = initialState, action) {
    switch (action.type) {
      case FETCH_AGENTTRACKING_SUCCESS:
        return {
          ...state,
          agentTracking: {
            ...state.agentTracking,
            data: action.payload,
          },
        };

        case ADD_AGENTTRACKING:
          return{
            ...state,
            agentTracking: {
              ...state.agentTracking,
              data: action.payload
            },
          };

          case UPDATE_AGENTTRACKING:
        return {
          ...state,
          agentTracking: {
            ...state.agentTracking,
            data: action.payload,
          },
        };

        case AGENTTRACKING:
        return {
          ...state,
          agentTracking: {
            ...state.agentTracking,
            data: action.payload,
          },
        };

        case DELETE_AGENTTRACKING:
          return {
            ...state,
            agentTracking: {
              ...state.agentTracking,
              data: action.payload,
            },
          };
          

        default : 
        return state;
      }
    }

