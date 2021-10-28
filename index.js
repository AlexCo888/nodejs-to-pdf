const { createContract } = require("./createContract.js");
const express = require("express");
const app = express();
const cors = require("cors");
const fs = require("fs");
var hash = require("object-hash");
const PORT = process.env.PORT || 5000;

const contract = {
  contract: {
    name: "John Doe",
    address: "1234 Main Street",
    city: "San Francisco",
    state: "CA",
    country: "US",
    postal_code: 94111,
  },
  type: null,
  subtotal: 8000,
  paid: 0,
  contract_nr: 1234,
  contractor: "",
  hashedName: "",
};

app.use(express.json()); // to support JSON-encoded bodies
app.use(
  express.urlencoded({
    // to support URL-encoded bodies
    extended: true,
  })
);

app.use(cors()); // to support cross-origin resource sharing

app.post("/create-contract", (req, res) => {
  let hashedNameFile = hash(Math.random());
  contract.contractor = req.body.name;
  contract.hashedName = hashedNameFile;
  contract.type = req.body.contracts;

  createContract(contract, `${hashedNameFile}.pdf`);

  setTimeout(() => {
    const data = fs.readFileSync(`./${hashedNameFile}.pdf`);
    res.contentType("application/pdf");
    res.send(data);
  }, 100);
});

app.get("/", (req, res) => {
  res.send("Welcome to the pdf contractor creator");
});

app.listen(PORT, () => {
  console.log("Server is running on port 5000");
});
