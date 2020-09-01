import { ActionTypes } from "../actionTypes";

export interface BrickBalanceState {
    legoPiratesShipBrickList:   any[];
}

const initialState = {
    legoPiratesShipBrickList: [],
}


const getLegoPiratesShipBrickList = (state, action) => {
    return {
        ...state,
        legoPiratesShipBrickList: action.legoPiratesShipBrickList
    }
};

const reducer = (state: BrickBalanceState = initialState, action) => {
    switch (action.type) {
        case ActionTypes.BRICKS_BALANCE_LEGO_PIRATES_SHIP_BRICK_LIST_GET: return getLegoPiratesShipBrickList(state, action);
        default: return state;
    }
};

export default reducer;