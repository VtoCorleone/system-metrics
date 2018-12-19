const si = require('systeminformation');

const config = require('./config');
const aggregator = require('./aggregator');

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
      networkStats: await si.networkStats(),
    };

    aggregator.setData(data);
  } catch (error) {
    console.error(error);
  }
};

const collectData = async () => {
  const timestamp = Date.now();
  const data = {
    timestamp,
    mem: await si.mem(),
    fs: await si.fsSize(),
    // fsStats: await si.fsStats(),
    // disksIO: await si.disksIO(),
    // currentLoad: await si.currentLoad(),
    // networkStats: await si.networkStats(),
  };
  return data;
}

// setInterval(callMetrics, config.ITERATION_INTERVAL);

module.exports = {
  collectData
}