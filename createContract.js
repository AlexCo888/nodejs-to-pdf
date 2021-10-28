const fs = require("fs");
const PDFDocument = require("pdfkit");

const lorem = `Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum`;

function createContract(contract, path) {
  let doc = new PDFDocument({ size: "A4", margin: 50 });
  doc.info["Title"] = contract.hashedName;

  generateHeader(doc);
  generateCustomerInformation(doc, contract);
  generateContractTable(doc, contract);
  generateFooter(doc, contract);

  doc.end();
  doc.pipe(fs.createWriteStream(path));
}

function generateHeader(doc) {
  doc
    .image("logo.png", 50, 45, { width: 50 })
    .fillColor("#444444")
    .fontSize(20)
    .text("ACME Inc.", 110, 57)
    .fontSize(10)
    .text("ACME Inc.", 200, 50, { align: "right" })
    .text("123 Main Street", 200, 65, { align: "right" })
    .text("New York, NY, 10025", 200, 80, { align: "right" })
    .moveDown();
}

function generateCustomerInformation(doc, contract) {
  doc
    .fillColor("#444444")
    .fontSize(20)
    .text(`Summary Contract #${contract.type}`, 50, 160);

  generateHr(doc, 185);

  const customerInformationTop = 200;

  doc
    .fontSize(10)
    .text("Contract Number:", 50, customerInformationTop)
    .font("Helvetica-Bold")
    .text(contract.contract_nr, 150, customerInformationTop)
    .font("Helvetica")
    .text("Contract Date:", 50, customerInformationTop + 15)
    .text(formatDate(new Date()), 150, customerInformationTop + 15)
    .text("Total:", 50, customerInformationTop + 30)
    .text(
      formatCurrency(contract.subtotal - contract.paid),
      150,
      customerInformationTop + 30
    )

    .font("Helvetica-Bold")
    .text(contract.contract.name, 300, customerInformationTop)
    .font("Helvetica")
    .text(contract.contract.address, 300, customerInformationTop + 15)
    .text(
      contract.contract.city +
        ", " +
        contract.contract.state +
        ", " +
        contract.contract.country,
      300,
      customerInformationTop + 30
    )
    .moveDown();

  generateHr(doc, 252);
}

function generateContractTable(doc, contract) {
  doc.font("Helvetica-Bold");
  doc
    .text("Here is the Summary of the Contract", 100, 300)
    .font("Times-Roman", 13)
    .moveDown()
    .text(lorem, {
      width: 412,
      align: "justify",
      indent: 30,
      columns: parseInt(contract.type),
      height: 300,
      ellipsis: true,
    });
}

function generateFooter(doc, contract) {
  doc.fontSize(13).font("Helvetica-Bold").text(contract.contractor, 50, 745, {
    align: "center",
    width: 500,
  });
  doc
    .fontSize(10)
    .font("Helvetica")
    .text(`${contract.hashedName}.pdf`, 50, 760, {
      align: "center",
      width: 500,
    });
  doc.moveTo(250, 730).lineTo(350, 730).stroke();
}

function generateHr(doc, y) {
  doc.strokeColor("#aaaaaa").lineWidth(1).moveTo(50, y).lineTo(550, y).stroke();
}

function formatCurrency(cents) {
  return "$" + (cents / 100).toFixed(2);
}

function formatDate(date) {
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();

  return year + "/" + month + "/" + day;
}

module.exports = {
  createContract,
};
