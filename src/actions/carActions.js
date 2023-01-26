export const FETCH_CAR = "FETCH_CAR";
export const FETCH_CAR_SUCCESS = "FETCH_CAR_SUCCESS";
export const FETCH_CAR_FAILURE = "FETCH_CAR_FAILURE";
export const ADD_CAR = "ADD_CAR";
export const UPDATE_CAR = "UPDATE_CAR";
export const DELETE_CAR = "DELETE_CAR";
export const CAR = "CAR";

export const getCarBeginAction = () => ({
    type: FETCH_CAR,
})

export const getCarSuccessAction = (data) => ({
    type: FETCH_CAR_SUCCESS,
    payload: data,
})

export const getCarFailureAction = (error) => ({
    type: FETCH_CAR_FAILURE,
    payload: { error },
})

export const addCarAction = (data) => ({
    type: ADD_CAR,
    payload: data,
})

export const carAction = (data) => ({
    type: CAR,
    payload: data,
})

export const updateCarAction = (data) => ({
    type: UPDATE_CAR,
    payload: data,
})
export const deleteCarAction = (data) => ({
    type: DELETE_CAR,
    payload: data,
})
