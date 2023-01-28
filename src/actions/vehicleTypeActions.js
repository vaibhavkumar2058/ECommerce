export const FETCH_VEHICLETYPE = "FETCH_VEHICLETYPE";
export const FETCH_VEHICLETYPE_SUCCESS = "FETCH_VEHICLETYPE_SUCCESS";
export const FETCH_VEHICLETYPE_FAILURE = "FETCH_VEHICLETYPE_FAILURE";
export const ADD_VEHICLETYPE = "ADD_VEHICLETYPE";
export const UPDATE_VEHICLETYPE = "UPDATE_VEHICLETYPE";
export const DELETE_VEHICLETYPE = "DELETE_VEHICLETYPE";
export const VEHICLETYPE = "VEHICLETYPE";

export const getVehicleTypeBeginAction = () => ({
    type: FETCH_VEHICLETYPE,
})
export const getVehicleTypeSuccessAction = (data) => ({
    type: FETCH_VEHICLETYPE_SUCCESS,
    payload:data,
})
export const getVehicleTypeFailureAction = (error) => ({
    type: FETCH_VEHICLETYPE_FAILURE,
    payload:{error},
})
export const addVehicleTypeAction = (data) => ({
    type: ADD_VEHICLETYPE,
    payload: data,
})
export const vehicleTypeAction = (data) => ({
    type: VEHICLETYPE,
    payload: data,
})

export const updateVehicleTypeAction = (data) => ({
    type: UPDATE_VEHICLETYPE,
    payload: data,
})
export const deleteVehicleTypeAction = (data) => ({
    type: DELETE_VEHICLETYPE,
    payload: data,
})












