import { ActionTypes } from "../actionTypes";
import * as setApi from "../../api/brick-balance.api";


export const getLegoPiratesShipBrickListSuccess = (legoPiratesShipBrickList) => {
    return {
        type: ActionTypes.BRICKS_BALANCE_LEGO_PIRATES_SHIP_BRICK_LIST_GET,
        legoPiratesShipBrickList
    };
};

export const getLegoPiratesShipBrickListFailed = () => {
    return {
        type: ActionTypes.BRICKS_BALANCE_LEGO_PIRATES_SHIP_BRICK_LIST_GET_FAIL,
    };
};

export const getLegoPiratesShipBrickListById = (legoSetId: string) => {
    return dispatch => {
        setApi.fetchLegoPiratesShipBrickList(legoSetId).then(response => {
            dispatch(getLegoPiratesShipBrickListSuccess(response.data.items));
        }).catch(error => {
            dispatch(getLegoPiratesShipBrickListFailed());
        })
    }
};