import api from ".";

export const fetchSetsList = () => {
    return api.get(`sets`)
}

export const fetchSetById = (setId: string) => {
    return api.get(`sets/${setId}`)
}

export const fetchSetBricksBySetId = (setId: string) => {
    return api.get(`sets/${setId}/bricks`)
}

export const updatLegoBrickQuantityInSet = (elementId: string, setId: string , quantityInSet: number) => {
    return api.patch(`sets/${setId}/bricks/${elementId}/quantity-in-set`, {quantityInSet});
}