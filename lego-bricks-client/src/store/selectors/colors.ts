import { RootState } from "../rootReducer"

export const selectColorsExactList = (state: RootState) => {
    return state.colors.colorExactList
}

