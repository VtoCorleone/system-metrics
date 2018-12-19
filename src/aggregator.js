const fs = require('fs');
const util = require('util');

const writeFile = util.promisify(fs.writeFile);

// TODO: create as envars
const fileLocation = '';
const iterationsToSave = 15;

const dataCollection = [];
let counter = 1;

const resetCounter = () => counter = 1;

const setData = data => {
  dataCollection.push(data);
  if (counter > iterationsToSave) {
    try {
      await writeFile(`${fileLocation}/${new Date()}.json`, dataCollection, 'utf8');
    } catch (error) {
      console.error(error);
    }
    dataCollection = [];
    resetCounter();
  } else {
    counter += 1;
  }
};

module.exports = {
  setData,
};
