import { ActionTypes } from "../actionTypes";
import LegoSet from "../../views/Set/LegoSet.model";

export interface SetsState {
  setsList: LegoSet[];
  set: LegoSet | null;
  setBricks: any[];
}

const initialState = {
  setsList: [],
  set: null,
  setBricks: [],
};

const getSetsList = (state: any, action: any) => {
  return {
    ...state,
    setsList: action.sets,
  };
};

const getSetDetails = (state: any, action: any) => {
  return {
    ...state,
    set: action.set,
  };
};

const getSetBricksBySetId = (state: any, action: any) => {
  return {
    ...state,
    setBricks: action.setBricks,
  };
};

const getSetBricksBySetIdInit = (state: any, action: any) => {
  return {
    ...state,
    setBricks: [],
  };
};

const updateLegoBrickQuantityInSet = (state: any, action: any) => {
  return {
    ...state,
    message: action.message,
  };
};

const reducer = (state: SetsState = initialState, action: any) => {
  switch (action.type) {
    case ActionTypes.SET_LIST_GET:
      return getSetsList(state, action);
    case ActionTypes.SET_DETAILS_GET:
      return getSetDetails(state, action);
    case ActionTypes.SET_BRICKS_LIST_GET_INIT:
      return getSetBricksBySetIdInit(state, action);
    case ActionTypes.SET_BRICKS_LIST_GET:
      return getSetBricksBySetId(state, action);
    case ActionTypes.UPDATE_LEGO_SET_BRICK_QUANTITY_IN_SET:
      return updateLegoBrickQuantityInSet(state, action);
    default:
      return state;
  }
};

export default reducer;
