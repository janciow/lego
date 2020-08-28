import { ActionTypes } from "../actionTypes";
import LegoSet from "../../views/Set/LegoSet.model";

export interface SetsState {
    setsList: LegoSet[];
    set: LegoSet | null;
}

const initialState = {
    setsList: [],
    set: null
};

const getSetsList = (state, action) => {
    return {
        ...state,
        setsList: action.sets
    }
};

const getSetDetails = (state, action) => {
    return {
        ...state,
        set: action.sets
    }
};

const reducer = (state: SetsState = initialState, action) => {
    switch (action.type) {
        case ActionTypes.SET_LIST_GET: return getSetsList(state, action);
        case ActionTypes.SET_DETAILS_GET: return getSetDetails(state, action);
        default: return state;
    }
};

export default reducer;