import { ActionTypes } from "../actionTypes";
import LegoColorExact from "../../views/Set/LegoColorExact.model";

export interface ColorExactState {
    colorExactList: LegoColorExact[];
}

const initialState = {
    colorExactList: [],
};

const getColorExactList = (state: any, action: any) => {
    return {
        ...state,
        colorExactList: action.colors
    }
};

const reducer = (state: ColorExactState = initialState, action: any) => {
    switch (action.type) {
        case ActionTypes.COLORS_EXACT_LIST_GET: return getColorExactList(state, action);
        default: return state;
    }
};

export default reducer;