import { ActionTypes } from "../actionTypes";

export interface BrickBalanceState {
    legoPiratesShipBrickList:   any[];
    legoStarWarsCloneShipBrickList:   any[];
}

const initialState = {
    legoPiratesShipBrickList: [],
    legoStarWarsCloneShipBrickList: [],
}


const getLegoPiratesShipBrickList = (state: any, action: any) => {
    return {
        ...state,
        legoPiratesShipBrickList: action.legoPiratesShipBrickList
    }
};

const getLegoStarWarsClonesShipBrickList = (state: any, action: any) => {
    return {
        ...state,
        legoStarWarsCloneShipBrickList: action.legoStarWarsCloneShipBrickList
    }
};

const reducer = (state: BrickBalanceState = initialState, action: any) => {
    switch (action.type) {
        case ActionTypes.BRICKS_BALANCE_LEGO_PIRATES_SHIP_BRICK_LIST_GET: return getLegoPiratesShipBrickList(state, action);
        case ActionTypes.BRICKS_BALANCE_LEGO_STAR_WARS_CLONE_SHIP_BRICK_LIST_GET: return getLegoStarWarsClonesShipBrickList(state, action);
        default: return state;
    }
};

export default reducer;