const colorMap = require("../colorMap");

const prepereBrickData = (legotElements) => {

    let brickData = [];
    const colors = [[999, colorMap[999], 1],];

    legotElements.forEach(legotElement => {

        const { pathname } = new URL(legotElement.imgUrl);
        const urlPathParam = legotElement.imgUrl.split('/');
        let colorId = urlPathParam[4];
        const model_id = legotElement.model_id.replace('(Inv)', '').trim();

        colors.push([
            colorId,
            colorMap[colorId],
            1
        ])

        const imageType = urlPathParam[3];
        if (imageType === 'M') {
            colorId = 999
        }

        brickData.push([
            +colorId,
            'Y910',
            '' + model_id + colorId,
            model_id,
            0.5,
            legotElement.description,
            pathname
        ])
    });

    return {colors, brickData }

}

module.exports = prepereBrickData