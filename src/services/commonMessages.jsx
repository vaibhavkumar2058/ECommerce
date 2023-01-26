import {
  SET_ERROR,
  SET_SUCCESS,
  SET_UPDATE,
  SET_DELETE,
  SET_LOADING,
  CLEAR_LOADING,

} from "./constants";

export const setSuccess = ({status, message}) => ({
  type: SET_ERROR,
  payload: { status, message }
});

export const setError = ({status, message}) => ({
    type: SET_SUCCESS,
    payload: { status, message }
  });

  export const setUpdate = ({status, message}) => ({
    type: SET_UPDATE,
    payload: { status, message }
  });

  export const setDelete = ({status, message}) => ({
    type: SET_DELETE,
    payload: { status, message }
  });

  export const setLoading = () => ({
    type: SET_LOADING,
  });

  export const clearLoading = () => ({
    type: CLEAR_LOADING,
  });
