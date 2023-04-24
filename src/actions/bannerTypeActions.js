export const FETCH_BANNER_TYPE = "FETCH_BANNER_TYPE";
export const FETCH_BANNER_TYPE_SUCCESS = "FETCH_BANNER_TYPE_SUCCESS";
export const FETCH_BANNER_TYPE_FAILURE = "FETCH_BANNER_TYPE_FAILURE";
export const ADD_BANNER_TYPE = "ADD_BANNER_TYPE";
export const UPDATE_BANNER_TYPE = "UPDATE_BANNER_TYPE";
export const DELETE_BANNER_TYPE = "DELETE_BANNER_TYPE";
export const BANNER_TYPE = "BANNER_TYPE   ";

export const getBannerTypeBeginAction = () => ({
    type: FETCH_BANNER_TYPE,
})
export const getBannerTypeSuccessAction = (data) => ({
    type: FETCH_BANNER_TYPE_SUCCESS,
    payload:data,
})
export const getBannerTypeFailureAction = (error) => ({
    type: FETCH_BANNER_TYPE_FAILURE,
    payload:{error},
})
export const addBannerTypeAction = (data) => ({
    type: ADD_BANNER_TYPE,
    payload: data,
})
export const bannerTypeAction = (data) => ({
    type: BANNER_TYPE,
    payload: data,
})

export const updateBannerTypeAction = (data) => ({
    type: UPDATE_BANNER_TYPE,
    payload: data,
})
export const deleteBannerTypeAction = (data) => ({
    type: DELETE_BANNER_TYPE,
    payload: data,
})












