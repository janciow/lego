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
            console.log(response);
            
            dispatch(getLegoSetDetailsSuccess(response.data.items));
        }).catch(error => {
            dispatch(getLegoSetDetailsFailed());
        })
    }
};