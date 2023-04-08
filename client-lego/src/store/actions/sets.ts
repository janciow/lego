import { ActionTypes } from "../actionTypes";
import * as setApi from "../../api/set.api";

export const getSetsSuccess = (sets:any) => {
  return {
    type: ActionTypes.SET_LIST_GET,
    sets,
  };
};

export const getSetsFailed = () => {
  return {
    type: ActionTypes.SET_LIST_GET_FAIL,
  };
};

export const getSetsList = () => {
  return (dispatch:any) => {
    setApi
      .fetchSetsList()
      .then((response) => {
        dispatch(getSetsSuccess(response.data.items));
      })
      .catch((error) => {
        dispatch(getSetsFailed());
      });
  };
};

export const getLegoSetDetailsSuccess = (set:any) => {
  return {
    type: ActionTypes.SET_DETAILS_GET,
    set,
  };
};

export const getLegoSetDetailsFailed = () => {
  return {
    type: ActionTypes.SET_DETAILS_GET_FAIL,
  };
};

export const getLegoSetDetails = (legoSetId: string) => {
  return (dispatch:any) => {
    setApi
      .fetchSetById(legoSetId)
      .then((response) => {
        dispatch(getLegoSetDetailsSuccess(response.data.data[0]));
      })
      .catch((error) => {
        dispatch(getLegoSetDetailsFailed());
      });
  };
};

export const getSetBricksBySetIdSuccess = (setBricks:any) => {
  return {
    type: ActionTypes.SET_BRICKS_LIST_GET,
    setBricks,
  };
};

export const getSetBricksBySetIdFailed = () => {
  return {
    type: ActionTypes.SET_BRICKS_LIST_GET_FAIL,
  };
};

export const getSetBricksBySetId = (
  legoSetId: string,
  resetTable: boolean = false
) => {
  return (dispatch:any) => {
    resetTable &&
      dispatch({
        type: ActionTypes.SET_BRICKS_LIST_GET_INIT,
      });
    setApi
      .fetchSetBricksBySetId(legoSetId)
      .then((response) => {
        dispatch(getSetBricksBySetIdSuccess(response.data.items));
      })
      .catch((error) => {
        dispatch(getSetBricksBySetIdFailed());
      });
  };
};

export const updateLegoBrickQuantityInSetSuccess = (response:any) => {
  return {
    type: ActionTypes.UPDATE_LEGO_SET_BRICK_QUANTITY_IN_SET,
    message: response.data.message,
  };
};

export const updateLegoBrickQuantityInSetFailed = () => {
  return {
    type: ActionTypes.UPDATE_LEGO_SET_BRICK_QUANTITY_IN_SET_FAIL,
  };
};

export const updateLegoBrickQuantityInSet = (
  elementId: string,
  setId: string,
  quantityInSet: number
) => {
  return (dispatch:any) => {
    return setApi
      .updateLegoBrickQuantityInSet(elementId, setId, quantityInSet)
      .then((response) => {
        dispatch(updateLegoBrickQuantityInSetSuccess(response));
      })
      .catch((error) => {
        dispatch(updateLegoBrickQuantityInSetFailed());
      });
  };
};
