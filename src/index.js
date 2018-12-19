const si = require("systeminformation");
const fs = require("fs");
const util = require("util");

const writeFile = util.promisify(fs.writeFile);
const readFile = util.promisify(fs.readFile);
const unlink = util.promisify(fs.unlink);
const access = util.promisify(fs.access);

const { FILE_LOCATION } = require("./config");
const aggregator = require("./aggregator");

const callMetrics = async () => {
  try {
    // console.log({ mem: await si.mem() });
    // console.log({ fs: await si.fsSize() });
    // console.log({ fsStats: await si.fsStats() });
    // console.log({ disksIO: await si.disksIO() });
    // console.log({ currentLoad: await si.currentLoad() });
    // console.log({ networkStats: await si.networkStats() });
    // console.log({ memLayout: await si.memLayout() });
    // console.log({ diskLayout: await si.diskLayout() });

    const data = {};
    const now = new Date();
    data[now.getTime()] = {
      mem: await si.mem(),
      fs: await si.fsSize(),
      fsStats: await si.fsStats(),
      disksIO: await si.disksIO(),
      currentLoad: await si.currentLoad(),
      networkStats: await si.networkStats()
    };

    // aggregator.setData(data);
  } catch (error) {
    console.error(error);
  }
};

const collectData = async () => {
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
  try {
    const destination = `${FILE_LOCATION}/${Date.now()}_systemmetrics.json`;
    await writeFile(destination, JSON.stringify(data), "utf8");
    return destination;
  } catch (e) {
    console.log("e:", e);
  }
};

const readData = async filePath => {
  try {
    const result = await readFile(filePath);
    return JSON.parse(result.toString());
  } catch (e) {
    console.log("e:", e);
  }
};

const deleteFile = async filePath => {
  try {
    await unlink(filePath);
  } catch (e) {
    console.log("e:", e);
  }
};

const fileExists = async filePath => {
  try {
    await access(filePath);
    return true;
  } catch (e) {
    if (e.code === "ENOENT") return false;
    console.log("e:", e);
  }
};
// setInterval(callMetrics, config.ITERATION_INTERVAL);

module.exports = {
  collectData,
  writeData,
  readData,
  deleteFile,
  fileExists
};
