import api from ".";

export const fetchLegoExactColorsList = () => {
    return api.get(`colors`)
}