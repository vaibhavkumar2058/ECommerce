export const FETCH_RESOURCES = "FETCH_RESOURCES";
export const FETCH_RESOURCES_SUCCESS = "FETCH_RESOURCES_SUCCESS";
export const FETCH_RESOURCES_FAILURE = "FETCH_RESOURCES_FAILURE";
export const ADD_RESOURCES = "ADD_RESOURCES";
export const UPDATE_RESOURCES = "UPDATE_RESOURCES";
export const DELETE_RESOURCES = "DELETE_RESOURCES";
export const RESOURCES = "RESOURCES";

export const getResourcesBeginAction = () => ({
    type: FETCH_RESOURCES,
})
export const getResourcesSuccessAction = (data) => ({
    type: FETCH_RESOURCES_SUCCESS,
    payload:data,
})
export const getResourcesFailureAction = (error) => ({
    type: FETCH_RESOURCES_FAILURE,
    payload:{error},
})
export const addResourcesAction = (data) => ({
    type: ADD_RESOURCES,
    payload: data,
})
export const resourcesAction = (data) => ({
    type: RESOURCES,
    payload: data,
})

export const updateResourcesAction = (data) => ({
    type: UPDATE_RESOURCES,
    payload: data,
})
export const deleteResourcesAction = (data) => ({
    type: DELETE_RESOURCES,
    payload: data,
})