
const queryError = (err, res) => {
    console.log(JSON.stringify(err));

    res.json({
      Error: 1,
      Message: "Error while getting the data from Remote DataBase lego.org",
    });

    return
};

exports.queryError = queryError;
