import { ActionTypes } from "../actionTypes";
import * as setApi from "../../api/set.api"

export const getSetsSuccess = (sets) => {
    return {
        type: ActionTypes.SET_LIST_GET,
        sets
    };
};

export const getSetsFailed = () => {
    return {
        type: ActionTypes.SET_LIST_GET_FAIL,
    };
};

export const getSetsList = () => {
    return dispatch => {
        setApi.fetchSetsList().then(response => {
            dispatch(getSetsSuccess(response.data.items));
        }).catch(error => {
            dispatch(getSetsFailed());
        })
    }
};

export const getLegoSetDetailsSuccess = (set) => {
    return {
        type: ActionTypes.SET_DETAILS_GET,
        set
    };
};

export const getLegoSetDetailsFailed = () => {
    return {
        type: ActionTypes.SET_DETAILS_GET_FAIL,
    };
};

export const getLegoSetDetails = (legoSetId: string) => {
    return dispatch => {
        setApi.fetchSetById(legoSetId).then(response => {
            dispatch(getLegoSetDetailsSuccess(response.data.data[0]));
        }).catch(error => {
            dispatch(getLegoSetDetailsFailed());
        })
    }
};

export const getSetBricksBySetIdSuccess = (setBricks) => {
    return {
        type: ActionTypes.SET_BRICKS_LIST_GET,
        setBricks
    };
};

export const getSetBricksBySetIdFailed = () => {
    return {
        type: ActionTypes.SET_BRICKS_LIST_GET_FAIL,
    };
};

export const getSetBricksBySetId = (legoSetId: string, resetTable: boolean = false) => {
    return dispatch => {

        resetTable &&  dispatch({
            type: ActionTypes.SET_BRICKS_LIST_GET_INIT,
        })
        setApi.fetchSetBricksBySetId(legoSetId).then(response => {
            dispatch(getSetBricksBySetIdSuccess(response.data.items));
        }).catch(error => {
            dispatch(getSetBricksBySetIdFailed());
        })
    }
};

export const updateLegoBrickQuantityInSetSuccess = (response) => {
    return {
        type: ActionTypes.UPDAT_LEGO_SET_BRICK_QUANTITY_IN_SET,
        message: response.data.message
    };
};

export const updateLegoBrickQuantityInSetFailed = () => {
    return {
        type: ActionTypes.UPDAT_LEGO_SET_BRICK_QUANTITY_IN_SET_FAIL,
    };
};

export const updateLegoBrickQuantityInSet = (elementId: string, setId:string ,quantityInSet: number) => {
    return dispatch => {
       return setApi.updateLegoBrickQuantityInSet(elementId, setId, quantityInSet).then(response => {
            dispatch(updateLegoBrickQuantityInSetSuccess(response));
        }).catch(error => {
            dispatch(updateLegoBrickQuantityInSetFailed());
        })

    }
};