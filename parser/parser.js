const createLegoSetJson = require("./createLegoSetJson");

const setLinks = [
  {
    url:
      "https://www.bricklink.com/catalogItemInv.asp?fromForm=Y&itemType=S&itemNo=10040&itemSeq=1",
    setNumber: "10040",
  },
  {
    url: "https://www.bricklink.com/catalogItemInv.asp?S=6286-1",
    setNumber: "6286",
  },
  {
    url: "https://www.bricklink.com/catalogItemInv.asp?S=10210-1",
    setNumber: "10210",
  },
  {
    url: "https://www.bricklink.com/catalogItemInv.asp?S=6274-1",
    setNumber: "6274",
  },
  {
    url: "https://www.bricklink.com/CatalogItemInv.asp?S=6243-1",
    setNumber: "6243",
  },
  {
    url: "https://www.bricklink.com/catalogItemInv.asp?S=4195-1",
    setNumber: "4195",
  },
  {
    url: "https://www.bricklink.com/catalogItemInv.asp?S=6285-1",
    setNumber: "6285",
  },
  {
    url:
      "https://www.bricklink.com/catalogItemInv.asp?fromForm=Y&itemType=S&itemNo=70413-1&itemSeq=1",
    setNumber: "70413",
  },
  {
    url:
      "https://www.bricklink.com/catalogItemInv.asp?fromForm=Y&itemType=S&itemNo=7675&itemSeq=1",
    setNumber: "7675",
  },
  {
    url:
      "https://www.bricklink.com/catalogItemInv.asp?fromForm=Y&itemType=S&itemNo=7676&itemSeq=1",
    setNumber: "7676",
  },
  {
    setNumber: "10195",
    url:
      "https://www.bricklink.com/catalogItemInv.asp?fromForm=Y&itemType=S&itemNo=10195&itemSeq=1",
  },
];

setLinks.forEach(({ url, setNumber }) => {
  createLegoSetJson(url, setNumber);
});
