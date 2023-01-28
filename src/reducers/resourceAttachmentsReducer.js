import {
    ADD_RESOURCE_ATTACHMENTS,
    UPDATE_RESOURCE_ATTACHMENTS,
    DELETE_RESOURCE_ATTACHMENTS,
    FETCH_RESOURCE_ATTACHMENTS,
    FETCH_RESOURCE_ATTACHMENTS_SUCCESS,
    FETCH_RESOURCE_ATTACHMENTS_FAILURE,
    RESOURCE_ATTACHMENTS,
  } from "../actions/resourceAttachmentsActions";
  
  const initialState = {
    loading: true,
    error: null,
    data: null,
  };
  
  export function resourceAttachmentsReducer(state = initialState, action) {
    switch (action.type) {
  
      case FETCH_RESOURCE_ATTACHMENTS_SUCCESS:
        return {
          ...state,
          resourceAttachments: {
            ...state.resourceAttachments,
            data: action.payload,
          },
        };
  
  
  
      case ADD_RESOURCE_ATTACHMENTS:
        return {
          ...state,
          resourceAttachments: {
            ...state.resourceAttachments,
            data: action.payload,
          },
        };
  
        case UPDATE_RESOURCE_ATTACHMENTS:
        return {
          ...state,
          resourceAttachments: {
            ...state.resourceAttachments,
            data: action.payload,
          },
        };
  
        case RESOURCE_ATTACHMENTS:
        return {
          ...state,
          resourceAttachments: {
            ...state.resourceAttachments,
            data: action.payload,
          },
        };
  
        case DELETE_RESOURCE_ATTACHMENTS:
          return {
            ...state,
            resourceAttachments: {
              ...state.resourceAttachments,
              data: action.payload,
            },
          };
  
  
  
      default:
        return state;
    }
  }
  