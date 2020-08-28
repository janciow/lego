import { combineReducers } from "redux";
import setsReducer from './reducers/sets';

const rootReducer = combineReducers({
    sets: setsReducer,
})

export type RootState = ReturnType<typeof rootReducer>

export default rootReducer;