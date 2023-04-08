import { ActionTypes } from "../actionTypes";
import * as setApi from "../../api/color.api"

export const getColorsSuccess = (colors:any) => {
    return {
        type: ActionTypes.COLORS_EXACT_LIST_GET,
        colors
    };
};

export const getColorsFailed = () => {
    return {
        type: ActionTypes.COLORS_EXACT_GET_FAIL,
    };
};

export const getColorsList = () => {
    return (dispatch: any) => {
        setApi.fetchLegoExactColorsList().then(response => {
            dispatch(getColorsSuccess(response.data.items));
        }).catch(error => {
            dispatch(getColorsFailed());
        })
    }
};
