const createLegoSetJson = require('./createLegoSetJson');
// const url = 'https://www.bricklink.com/catalogItemInv.asp?fromForm=Y&itemType=S&itemNo=10040&itemSeq=1';
// const setNumber = '10040'
// const url = 'https://www.bricklink.com/catalogItemInv.asp?S=6286-1';
// const setNumber = '6286'
// const url = 'https://www.bricklink.com/catalogItemInv.asp?S=10210-1';
// const setNumber = '10210'

// const url = 'https://www.bricklink.com/catalogItemInv.asp?S=6274-1';
// const setNumber = '6274'
// const url = 'https://www.bricklink.com/CatalogItemInv.asp?S=6243-1';
// const setNumber = '6243'
// const url = 'https://www.bricklink.com/catalogItemInv.asp?S=4195-1';
// const setNumber = '4195'
// const url = 'https://www.bricklink.com/catalogItemInv.asp?S=6285-1';
// const setNumber = '6285';
const url = 'https://www.bricklink.com/catalogItemInv.asp?fromForm=Y&itemType=S&itemNo=70413-1&itemSeq=1';
const setNumber = '70413';

createLegoSetJson(url, setNumber)