import { combineReducers } from "redux";
import setsReducer from './reducers/sets';
import brickBalanceReducer from './reducers/brick-balance';

const rootReducer = combineReducers({
    sets: setsReducer,
    brickBalance: brickBalanceReducer,
})

export type RootState = ReturnType<typeof rootReducer>

export default rootReducer;