import { ActionTypes } from "../actionTypes";
import * as setApi from "../../api/brick-balance.api";

export const getLegoPiratesShipBrickListSuccess = (
  legoPiratesShipBrickList
) => {
  return {
    type: ActionTypes.BRICKS_BALANCE_LEGO_PIRATES_SHIP_BRICK_LIST_GET,
    legoPiratesShipBrickList,
  };
};

export const getLegoPiratesShipBrickListFailed = () => {
  return {
    type: ActionTypes.BRICKS_BALANCE_LEGO_PIRATES_SHIP_BRICK_LIST_GET_FAIL,
  };
};

export const getLegoPiratesShipBrickListById = (legoSetId: string) => {
  return (dispatch) => {
    setApi
      .fetchLegoPiratesShipBrickList(legoSetId)
      .then((response) => {
        dispatch(getLegoPiratesShipBrickListSuccess(response.data.items));
      })
      .catch((error) => {
        dispatch(getLegoPiratesShipBrickListFailed());
      });
  };
};

export const getLegoStarWarsCloneShipBrickListSuccess = (
  legoStarWarsCloneShipBrickList
) => {
  return {
    type: ActionTypes.BRICKS_BALANCE_LEGO_STAR_WARS_CLONE_SHIP_BRICK_LIST_GET,
    legoStarWarsCloneShipBrickList,
  };
};

export const getLegoStarWarsCloneShipBrickListFailed = () => {
  return {
    type: ActionTypes.BRICKS_BALANCE_LEGO_LEGO_STAR_WARS_CLONE_SHIP_BRICK_LIST_GET_FAIL,
  };
};

export const getLegoStarWarsCloneShipBrickListById = (
  legoSetId: string,
  orderBy?: string,
  orderDirection?: string
) => {
  return (dispatch) => {
    setApi
      .fetchLegoStarWarsCloneShipBrickList(legoSetId, orderBy, orderDirection)
      .then((response) => {
        dispatch(getLegoStarWarsCloneShipBrickListSuccess(response.data.items));
      })
      .catch((error) => {
        dispatch(getLegoStarWarsCloneShipBrickListFailed());
      });
  };
};
