import { ActionTypes } from "../actionTypes";
import * as setApi from "../../api/brick.api"

export const updatLegoBrickTotalQuantitySuccess = (response) => {
    return {
        type: ActionTypes.UPDAT_LEGO_BRICK_TOTAL_QUANTITY,
        message: response.data.message
    };
};

export const updatLegoBrickTotalQuantityFailed = () => {
    return {
        type: ActionTypes.UPDAT_LEGO_BRICK_TOTAL_QUANTITY_FAIL,
    };
};

export const updatLegoBrickTotalQuantity = (elementId: string, quantityTotal: number) => {
    return dispatch => {
        setApi.updatLegoBrickQuantity(elementId, quantityTotal).then(response => {
            dispatch(updatLegoBrickTotalQuantitySuccess(response));
        }).catch(error => {
            dispatch(updatLegoBrickTotalQuantityFailed());
        })
    }
};
