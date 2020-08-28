import api from ".";

export const fetchSetsList = () => {
    return api.get(`sets`)
}

export const fetchSetById = (setId: string) => {
    return api.get(`sets/${setId}`)
}