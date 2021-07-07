import { combineReducers } from "redux";
import setsReducer from './reducers/sets';
import brickBalanceReducer from './reducers/brick-balance';
import bricksReducer from './reducers/bricks';
import colorsReducer from './reducers/colors';

const rootReducer = combineReducers({
    sets: setsReducer,
    brickBalance: brickBalanceReducer,
    bricks: bricksReducer,
    colors: colorsReducer,
})

export type RootState = ReturnType<typeof rootReducer>

export default rootReducer;