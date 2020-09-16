import { ActionTypes } from "../actionTypes";
export interface BricksState {
    message:   string;
}

const initialState = {
    message: '',
}

const updatLegoBrickTotalQuantity = (state, action) => {
    return {
        ...state,
        message: action.message
    }
};

const reducer = (state: BricksState = initialState, action) => {
    switch (action.type) {
        case ActionTypes.UPDAT_LEGO_BRICK_TOTAL_QUANTITY: return updatLegoBrickTotalQuantity(state, action);
        default: return state;
    }
};

export default reducer;