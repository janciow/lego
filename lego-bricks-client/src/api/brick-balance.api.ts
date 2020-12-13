import api from ".";

export const fetchLegoPiratesShipBrickList = (setId: string) => {
    return api.get(`brick-balance/lego-pirates-ship-brick-list/${setId}`)
}

export const fetchLegoStarWarsCloneShipBrickList = (setId: string) => {
    return api.get(`brick-balance/lego-star-wars-clone-ship-brick-list/${setId}`)
}