import { combineReducers } from "redux";
import setsReducer from './reducers/sets';
import brickBalanceReducer from './reducers/brick-balance';
import bricksReducer from './reducers/bricks';

const rootReducer = combineReducers({
    sets: setsReducer,
    brickBalance: brickBalanceReducer,
    bricks: bricksReducer,
})

export type RootState = ReturnType<typeof rootReducer>

export default rootReducer;