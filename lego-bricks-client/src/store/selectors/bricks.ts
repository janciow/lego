import { RootState } from "../rootReducer"

export const selectBrickList = (state: RootState) => {
    return state.bricks.bricks
}

