import {
    ADD_ATTACHMENTSTATUSTYPE,
    UPDATE_ATTACHMENTSTATUSTYPE,
    DELETE_ATTACHMENTSTATUSTYPE,
    FETCH_ATTACHMENTSTATUSTYPE,
    FETCH_ATTACHMENTSTATUSTYPE_SUCCESS,
    FETCH_ATTACHMENTSTATUSTYPE_FAILURE,
    ATTACHMENTSTATUSTYPE,
  } from "../actions/attachmentStatusTypeActions";
  
  const initialState = {
    loading: true,
    error: null,
    data: null,
  };
  
  export function attachmentStatusTypeReducer(state = initialState, action) {
    switch (action.type) {
  
      case FETCH_ATTACHMENTSTATUSTYPE_SUCCESS:
        return {
          ...state,
          attachmentStatusType: {
            ...state.attachmentStatusType,
            data: action.payload,
          },
        };
  
  
  
      case ADD_ATTACHMENTSTATUSTYPE:
        return {
          ...state,
          attachmentStatusType: {
            ...state.attachmentStatusType,
            data: action.payload,
          },
        };
  
        case UPDATE_ATTACHMENTSTATUSTYPE:
        return {
          ...state,
          attachmentStatusType: {
            ...state.attachmentStatusType,
            data: action.payload,
          },
        };
  
        case ATTACHMENTSTATUSTYPE:
        return {
          ...state,
          attachmentStatusType: {
            ...state.attachmentStatusType,
            data: action.payload,
          },
        };
  
        case DELETE_ATTACHMENTSTATUSTYPE:
          return {
            ...state,
            attachmentStatusType: {
              ...state.attachmentStatusType,
              data: action.payload,
            },
          };
  
      default:
        return state;
    }
  }
  