import {
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

        default : 
        return state;
      }
    }

