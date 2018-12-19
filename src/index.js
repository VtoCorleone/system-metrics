// TODO: create as envars
const timer = 1000;
const fileLocation = '';
const iterationsToSave = 15;

const si = require('systeminformation');

const dataCollection = {};
const counter = 1;

const execute = async method => {
  try {
    const func = si[method];
    const data = await func();
    const returnValue = {};
    returnValue[method] = data;
    return returnValue;
  } catch (error) {
    return error;
  }
}

const metricsValues = ['version', 'time', 'system', 'bios', 'baseboard', 'cpu', 'cpuFlags', 'cpuCache', 'cpuCurrentspeed', 'cpuTemperature', 'mem', 'memLayout', 'diskLayout', 'battery', 'graphics', 'osInfo', 'uuid', 'versions', 'shell', 'users', 'fsSize', 'blockDevices', 'fsStats', 'disksIO', 'networkInterfaces', 'networkInterfaceDefault', 'networkStats', 'networkConnections'];

const getValues = async () => {
  try {
    const doIt = metricsValues.map(value => execute(value));
    return Promise.all(doIt);
  } catch (error) {
    console.error(error);
  }
};

const cpu = async () => {
  try {
    const data = await si.cpu();
  } catch (error) {
    return error
  }
};

const resetCounter = () => counter = 1;

const setData = (data, iteration) => {
  // write to file 
  if (iteration > iterationsToSave) {

    resetCounter();
  }
};

const callMetrics = async () => {
  try {
    // const values = await getValues();
    // const s = await si.getStaticData();
    // const d = await si.getDynamicData();
    // console.log(s);
    // console.log(d);
    // const processes = await si.processes();
    // console.log(Object.keys(processes))
    // const data = await si.networkStats();
    // console.log(data);
    // const d = await si.mem();
    // console.log(d);
    // console.log({ cpu: await si.cpu() });
    // console.log({ cpuCache: await si.cpuCache() });
    // console.log({ cpuCurrentspeed: await si.cpuCurrentspeed() });

    // console.log({ mem: await si.mem() });
    // console.log({ fs: await si.fsSize() });
    // console.log({ fsStats: await si.fsStats() });
    // console.log({ disksIO: await si.disksIO() });
    // console.log({ currentLoad: await si.currentLoad() });
    // console.log({ networkStats: await si.networkStats() });

    const now = new Date();
    dataCollection[now.toString()] = {
      mem: await si.mem(),
      fs: await si.fsSize(),
      fsStats: await si.fsStats(),
      disksIO: await si.disksIO(),
      currentLoad: await si.currentLoad(),
      networkStats: await si.networkStats(),
    };

    // console.log({ memLayout: await si.memLayout() });
    // console.log({ diskLayout: await si.diskLayout() });
  } catch (error) {
    console.error(error);
  }
};

callMetrics();
setInterval(callMetrics, timer);