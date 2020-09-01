import { RootState } from "../rootReducer"

export const selectLegoPiratesShipBrickList= (state: RootState) => {
    return state.brickBalance.legoPiratesShipBrickList
} 