import { ActionTypes } from "../actionTypes";
import * as setApi from "../../api/brick.api"

export const updateLegoBrickTotalQuantitySuccess = (response) => {
    return {
        type: ActionTypes.UPDAT_LEGO_BRICK_TOTAL_QUANTITY,
        message: response.data.message
    };
};

export const updateLegoBrickTotalQuantityFailed = () => {
    return {
        type: ActionTypes.UPDAT_LEGO_BRICK_TOTAL_QUANTITY_FAIL,
    };
};

export const updateLegoBrickTotalQuantity = (elementId: string, quantityTotal: number) => {
    return dispatch => {
        setApi.updateLegoBrickQuantity(elementId, quantityTotal).then(response => {
            dispatch(updateLegoBrickTotalQuantitySuccess(response));
        }).catch(error => {
            dispatch(updateLegoBrickTotalQuantityFailed());
        })
    }
};
