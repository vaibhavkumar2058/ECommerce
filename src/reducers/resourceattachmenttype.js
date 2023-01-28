import {
    ADD_RESOURCEATTACHMENTTYPE,
    UPDATE_RESOURCEATTACHMENTTYPE,
    DELETE_RESOURCEATTACHMENTTYPE,
    FETCH_RESOURCEATTACHMENTTYPE,
    FETCH_RESOURCEATTACHMENTTYPE_SUCCESS,
    FETCH_RESOURCEATTACHMENTTYPE_FAILURE,
    RESOURCEATTACHMENTTYPE,
  } from "../actions/resourceAttachmentTypeActions";
  
  const initialState = {
    loading: true,
    error: null,
    data: null,
  };
  
  export function resourceAttachmentTypeReducer(state = initialState, action) {
    switch (action.type) {
  
      case FETCH_RESOURCEATTACHMENTTYPE_SUCCESS:
        return {
          ...state,
          resourceAttachmentType: {
            ...state.resourceAttachmentType,
            data: action.payload,
          },
        };
  
  
  
      case ADD_RESOURCEATTACHMENTTYPE:
        return {
          ...state,
          resourceAttachmentType: {
            ...state.resourceAttachmentType,
            data: action.payload,
          },
        };
  
        case UPDATE_RESOURCEATTACHMENTTYPE:
        return {
          ...state,
          resourceAttachmentType: {
            ...state.resourceAttachmentType,
            data: action.payload,
          },
        };
  
        case RESOURCEATTACHMENTTYPE:
        return {
          ...state,
          resourceAttachmentType: {
            ...state.resourceAttachmentType,
            data: action.payload,
          },
        };
  
        case DELETE_RESOURCEATTACHMENTTYPE:
          return {
            ...state,
            resourceAttachmentType: {
              ...state.resourceAttachmentType,
              data: action.payload,
            },
          };
  
  
  
      default:
        return state;
    }
  }
  