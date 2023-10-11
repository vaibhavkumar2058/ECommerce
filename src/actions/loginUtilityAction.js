export const FETCH_LOGIN = "FETCH_LOGIN";
export const FETCH_LOGIN_SUCCESS = "FETCH_LOGIN_SUCCESS";
export const FETCH_LOGIN_FAILURE = "FETCH_LOGIN_FAILURE";
export const ADD_LOGIN = "ADD_LOGIN";
export const UPDATE_LOGIN = "UPDATE_LOGIN";
export const DELETE_LOGIN= "DELETE_LOGIN";
export const LOGIN = "LOGIN";

export const getLoginBeginAction = () => ({
    type: FETCH_LOGIN,
})
export const getLogineSuccessAction = (data) => ({
    type: FETCH_LOGIN_SUCCESS,
    payload:data,
})
export const getLoginFailureAction = (error) => ({
    type: FETCH_LOGIN_FAILURE,
    payload:{error},
})
export const addLoginAction = (data) => ({
    type: ADD_LOGIN,
    payload: data,
})
export const loginAction = (data) => ({
    type: LOGIN,
    payload: data,
})
export const updateLoginAction = (data) => ({
    type: UPDATE_LOGIN,
    payload: data,
})
export const deleteLoginAction = (data) => ({
    type: DELETE_LOGIN,
    payload: data,
})