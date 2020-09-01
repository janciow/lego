import api from ".";

export const fetchLegoPiratesShipBrickList = (setId: string) => {
    return api.get(`brick-balance/lego-pirates-ship-brick-list/${setId}`)
}