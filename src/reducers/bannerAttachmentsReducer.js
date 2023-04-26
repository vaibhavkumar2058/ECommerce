import {
    ADD_BANNER_ATTACHMENTS,
    UPDATE_BANNER_ATTACHMENTS,
    DELETE_BANNER_ATTACHMENTS,
    FETCH_BANNER_ATTACHMENTS,
    FETCH_BANNER_ATTACHMENTS_SUCCESS,
    FETCH_BANNER_ATTACHMENTS_FAILURE,
    BANNER_ATTACHMENTS,
  } from "../actions/bannerAttachmentsActions";
  
  const initialState = {
    loading: true,
    error: null,
    data: null,
  };
  
  export function bannerAttachmentsReducer(state = initialState, action) {
    switch (action.type) {
  
      case FETCH_BANNER_ATTACHMENTS_SUCCESS:
        return {
          ...state,
          bannerAttachments: {
            ...state.bannerAttachments,
            data: action.payload,
          },
        };
  
  
  
      case ADD_BANNER_ATTACHMENTS:
        return {
          ...state,
          bannerAttachments: {
            ...state.bannerAttachments,
            data: action.payload,
          },
        };
  
        case UPDATE_BANNER_ATTACHMENTS:
        return {
          ...state,
          bannerAttachments: {
            ...state.bannerAttachments,
            data: action.payload,
          },
        };
  
        case BANNER_ATTACHMENTS:
        return {
          ...state,
          bannerAttachments: {
            ...state.bannerAttachments,
            data: action.payload,
          },
        };
  
        case DELETE_BANNER_ATTACHMENTS:
          return {
            ...state,
            bannerAttachments: {
              ...state.bannerAttachments,
              data: action.payload,
            },
          };
  
  
  
      default:
        return state;
    }
  }
  