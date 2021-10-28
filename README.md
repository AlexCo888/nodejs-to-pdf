# PDF Contract Generator

I created this program with Node.js and Express to insert a name in 3 different example contracts.
Each pdf is created in the root folder with a hashed filename. The hashed filename and the name are inserted at the bottom of each new pdf.

Here https://node-js-to-pdf.netlify.app/ you can see it in action.

## Prerequisites

- [Node.js](http://nodejs.org/) (with npm or Yarn)

## Getting Started

This repository is an example of how to create a PDF contract.

There are two important fields in this this repository:

- [`index.js`](index.js) is the main entry point. It defines the data structure used to create the contracts.
- [`createContract.js`](createContract.js) exports a function that can be used to create contract PDFs.
