import {
    ADD_PRODUCT_ATTACHMENTS,
    UPDATE_PRODUCT_ATTACHMENTS,
    DELETE_PRODUCT_ATTACHMENTS,
    FETCH_PRODUCT_ATTACHMENTS,
    FETCH_PRODUCT_ATTACHMENTS_SUCCESS,
    FETCH_PRODUCT_ATTACHMENTS_FAILURE,
    PRODUCT_ATTACHMENTS,
  } from "../actions/productAttachmentsActions";
  
  const initialState = {
    loading: true,
    error: null,
    data: null,
  };
  
  export function productAttachmentsReducer(state = initialState, action) {
    switch (action.type) {
  
      case FETCH_PRODUCT_ATTACHMENTS_SUCCESS:
        return {
          ...state,
          productAttachments: {
            ...state.productAttachments,
            data: action.payload,
          },
        };
  
  
  
      case ADD_PRODUCT_ATTACHMENTS:
        return {
          ...state,
          productAttachments: {
            ...state.productAttachments,
            data: action.payload,
          },
        };
  
        case UPDATE_PRODUCT_ATTACHMENTS:
        return {
          ...state,
          productAttachments: {
            ...state.productAttachments,
            data: action.payload,
          },
        };
  
        case PRODUCT_ATTACHMENTS:
        return {
          ...state,
          productAttachments: {
            ...state.productAttachments,
            data: action.payload,
          },
        };
  
        case DELETE_PRODUCT_ATTACHMENTS:
          return {
            ...state,
            productAttachments: {
              ...state.productAttachments,
              data: action.payload,
            },
          };
  
  
  
      default:
        return state;
    }
  }
  