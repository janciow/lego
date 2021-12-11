import api from ".";
// import { BrickQueryParams } from "../views/Brick/BrickList/BrickList";

export const fetchBrickList = (data: any) => {
    const searchParams = data ? new URLSearchParams(data) : '';

    return api.get(`bricks?${searchParams}`)
}

export const updateLegoBrickQuantity = (elementId: string, quantityTotal: number) => {
    return api.patch(`bricks/${elementId}/update-total-quantity`, {quantityTotal});
}