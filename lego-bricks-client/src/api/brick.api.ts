import api from ".";

export const updatLegoBrickQuantity = (elementId: string, quantityTotal: number) => {
    return api.patch(`bricks/${elementId}/update-total-quantity`, {quantityTotal});
}