const fs = require('fs');
const util = require('util');

const config = require('./config');

const writeFile = util.promisify(fs.writeFile);

// fs.existsSync(config.FILE_LOCATION) || fs.mkdirSync(config.FILE_LOCATION);

let dataCollection = [];
let counter = 1;

const resetCounter = () => counter = 1;
const resetDataCollection = () => dataCollection = [];

const setData = async data => {
  dataCollection.push(data);
  console.log(`counter: ${counter} - config ${config.ITERATIONS_TO_SAVE}`);
  if (counter > config.ITERATIONS_TO_SAVE) {
    try {
      console.log(`Writing tile to ${config.FILE_LOCATION}/${new Date()}.json`);
      await writeFile(`${config.FILE_LOCATION}/${new Date()}.json`, dataCollection, 'utf8');
    } catch (error) {
      console.error(error);
    }
    resetDataCollection();
    resetCounter();
  } else {
    counter += 1;
  }
};

module.exports = {
  setData,
};
