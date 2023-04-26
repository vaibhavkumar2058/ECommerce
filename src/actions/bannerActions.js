export const FETCH_BANNER = "FETCH_BANNER";
export const FETCH_BANNER_SUCCESS = "FETCH_BANNER_SUCCESS";
export const FETCH_BANNER_FAILURE = "FETCH_BANNER_FAILURE";
export const ADD_BANNER = "ADD_BANNER";
export const UPDATE_BANNER = "UPDATE_BANNER";
export const DELETE_BANNER = "DELETE_BANNER";
export const BANNER = "BANNER";

export const getBannerBeginAction = () => ({
    type: FETCH_BANNER,
})
export const getBannerSuccessAction = (data) => ({
    type: FETCH_BANNER_SUCCESS,
    payload:data,
})
export const getBannerFailureAction = (error) => ({
    type: FETCH_BANNER_FAILURE,
    payload:{error},
})
export const addBannerAction = (data) => ({
    type: ADD_BANNER,
    payload: data,
})
export const bannerAction = (data) => ({
    type: BANNER,
    payload: data,
})

export const updateBannerAction = (data) => ({
    type: UPDATE_BANNER,
    payload: data,
})
export const deleteBannerAction = (data) => ({
    type: DELETE_BANNER,
    payload: data,
})












