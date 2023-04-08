import LegoBrick from "../../views/Set/LegoBrick.model";
import { ActionTypes } from "../actionTypes";
export interface BricksState {
  message: string;
  bricks: LegoBrick[];
}

const initialState: BricksState = {
  message: "",
  bricks: [],
};

const getBricksList = (state: any, action: any) => {
  return {
    ...state,
    bricks: action.bricks,
  };
};

const updateLegoBrickTotalQuantity = (state: any, action: any) => {
  return {
    ...state,
    message: action.message,
  };
};

const reducer = (state: BricksState = initialState, action: any) => {
  switch (action.type) {
    case ActionTypes.UPDATE_LEGO_BRICK_TOTAL_QUANTITY:
      return updateLegoBrickTotalQuantity(state, action);
    case ActionTypes.BRICKS_LIST_GET:
      return getBricksList(state, action);
    default:
      return state;
  }
};

export default reducer;
