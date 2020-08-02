

const prepereSetsData = (legotElements, setNumber) => {

    let brickSetData = [];
    // const colors = [[999, colorMap[999], 1],];

    legotElements.forEach(legotElement => {

        const urlPathParam = legotElement.imgUrl.split('/');
        let colorId = urlPathParam[4];
        const model_id = legotElement.model_id.replace('(Inv)', '').trim();


        const imageType = urlPathParam[3];
        if (imageType === 'M') {
            colorId = 999
        }

        brickSetData.push([
            +setNumber,
            '' + model_id + colorId,
            +legotElement.quantity
        ])
    });

    return brickSetData

}

module.exports = prepereSetsData