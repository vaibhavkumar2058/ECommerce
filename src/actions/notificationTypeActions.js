export const FETCH_NOTIFICATION_TYPE = "FETCH_NOTIFICATION_TYPE";
export const FETCH_NOTIFICATION_TYPE_SUCCESS = "FETCH_NOTIFICATION_TYPE_SUCCESS";
export const FETCH_NOTIFICATION_TYPE_FAILURE = "FETCH_NOTIFICATION_TYPE_FAILURE";
export const ADD_NOTIFICATION_TYPE = "ADD_NOTIFICATION_TYPE";
export const UPDATE_NOTIFICATION_TYPE = "UPDATE_NOTIFICATION_TYPE";
export const DELETE_NOTIFICATION_TYPE = "DELETE_NOTIFICATION_TYPE";
export const NOTIFICATION_TYPE = "NOTIFICATION_TYPE";

export const getNotificationTypeBeginAction = () => ({
    type: FETCH_NOTIFICATION_TYPE,
})
export const getNotificationTypeSuccessAction = (data) => ({
    type: FETCH_NOTIFICATION_TYPE_SUCCESS,
    payload:data,
})
export const getNotificationTypeFailureAction = (error) => ({
    type: FETCH_NOTIFICATION_TYPE_FAILURE,
    payload:{error},
})
export const addNotificationTypeAction = (data) => ({
    type: ADD_NOTIFICATION_TYPE,
    payload: data,
})
export const notificationTypeAction = (data) => ({
    type: NOTIFICATION_TYPE,
    payload: data,
})

export const updateNotificationTypeAction = (data) => ({
    type: UPDATE_NOTIFICATION_TYPE,
    payload: data,
})
export const deleteNotificationTypeAction = (data) => ({
    type: DELETE_NOTIFICATION_TYPE,
    payload: data,
})
