import { RootState } from "../rootReducer"

export const selectSetsList = (state: RootState) => {
    return state.sets.setsList
}

export const selectSetdetails = (state: RootState) => {
    return state.sets.set
}

export const selectSetsBricks = (state: RootState) => {
    return state.sets.setBricks
}