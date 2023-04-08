import { ActionTypes } from "../actionTypes";
import * as setApi from "../../api/brick.api"
import { BrickQueryParams } from "../../views/Brick/BrickList/BrickList";

export const updateLegoBrickTotalQuantitySuccess = (response: any) => {
    return {
        type: ActionTypes.UPDATE_LEGO_BRICK_TOTAL_QUANTITY,
        message: response.data.message
    };
};

export const updateLegoBrickTotalQuantityFailed = () => {
    return {
        type: ActionTypes.UPDATE_LEGO_BRICK_TOTAL_QUANTITY_FAIL,
    };
};

export const updateLegoBrickTotalQuantity = (elementId: string, setId: string, quantityTotal: number) => {
    return (dispatch: any) => {
       return setApi.updateLegoBrickQuantity(elementId, quantityTotal).then(response => {
            dispatch(updateLegoBrickTotalQuantitySuccess(response));
        }).catch(error => {
            dispatch(updateLegoBrickTotalQuantityFailed());
        })
    }
};

export const getBricksSuccess = (bricks: any) => {
    return {
        type: ActionTypes.BRICKS_LIST_GET,
        bricks
    };
};

export const getBricksFailed = () => {
    return {
        type: ActionTypes.BRICKS_LIST_GET_FAIL,
    };
};

export const getBricksList = (qp: BrickQueryParams) => {
    return (dispatch: any) => {
        setApi.fetchBrickList(qp).then(response => {
            dispatch(getBricksSuccess(response.data.items));
        }).catch(error => {
            dispatch(getBricksFailed());
        })
    }
};
