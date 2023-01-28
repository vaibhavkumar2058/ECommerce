export const FETCH_NOTIFICATION = "FETCH_NOTIFICATION";
export const FETCH_NOTIFICATION_SUCCESS = "FETCH_NOTIFICATION_SUCCESS";
export const FETCH_NOTIFICATION_FAILURE = "FETCH_NOTIFICATION_FAILURE";
export const ADD_NOTIFICATION = "ADD_NOTIFICATION";
export const UPDATE_NOTIFICATION = "UPDATE_NOTIFICATION";
export const DELETE_NOTIFICATION = "DELETE_NOTIFICATION";
export const NOTIFICATION = "NOTIFICATION";

export const getNotificationBeginAction = () => ({
    type: FETCH_NOTIFICATION,
})
export const getNotificationSuccessAction = (data) => ({
    type: FETCH_NOTIFICATION_SUCCESS,
    payload:data,
})
export const getNotificationFailureAction = (error) => ({
    type: FETCH_NOTIFICATION_FAILURE,
    payload:{error},
})
export const addNotificationAction = (data) => ({
    type: ADD_NOTIFICATION,
    payload: data,
})
export const notificationAction = (data) => ({
    type: NOTIFICATION,
    payload: data,
})

export const updateNotificationAction = (data) => ({
    type: UPDATE_NOTIFICATION,
    payload: data,
})
export const deleteNotificationAction = (data) => ({
    type: DELETE_NOTIFICATION,
    payload: data,
})












