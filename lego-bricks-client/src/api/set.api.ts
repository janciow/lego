import api from ".";

export const getSetList = () => {
    return api.get(`sets`)
        .then(res => {
            console.log(res);
            console.log(res.data);
        })
}