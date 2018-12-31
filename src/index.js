const si = require("systeminformation");
const fs = require("fs");
const util = require("util");

const writeFile = util.promisify(fs.writeFile);
const readFile = util.promisify(fs.readFile);
const unlink = util.promisify(fs.unlink);
const access = util.promisify(fs.access);

const { FILE_LOCATION } = require("./config");
const aggregator = require("./aggregator");

const getData = async () => {
  const timestamp = Date.now();
  return {
    timestamp,
    mem: await si.mem(),
    fs: await si.fsSize(),
    fsStats: await si.fsStats(),
    disksIO: await si.disksIO(),
    currentLoad: await si.currentLoad(),
    networkStats: await si.networkStats()
  };
};

const writeData = async data => {
  const destination = `${FILE_LOCATION}/${Date.now()}_systemmetrics.json`;
  await writeFile(destination, JSON.stringify(data), "utf8");
  return destination;
};

const readData = async filePath => {
  const result = await readFile(filePath);
  return JSON.parse(result.toString());
};

const deleteFile = filePath => {
  return unlink(filePath);
};

const fileExists = async filePath => {
  try {
    await access(filePath);
    return true;
  } catch (e) {
    if (e.code === "ENOENT") return false;
    throw e;
  }
};

const collectMetrics = async () => {
  try {
    const data = await getData();
    return writeData(data);
  } catch (e) {
    if (e.code === "ENOENT") return false;
    console.log("e:", e);
  }
};

module.exports = {
  getData,
  writeData,
  readData,
  deleteFile,
  fileExists,
  collectMetrics
};
