import api from ".";

export const fetchBrickList = () => {
    return api.get(`bricks`)
}

export const updateLegoBrickQuantity = (elementId: string, quantityTotal: number) => {
    return api.patch(`bricks/${elementId}/update-total-quantity`, {quantityTotal});
}