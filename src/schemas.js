const joi = require("joi");

const validateSchema = (data, schema) => joi.validate(data, schema);

const stringRequired = joi.string().required();
const numberRequired = joi.number().required();

const memory = joi.object().keys({
  total: numberRequired,
  free: numberRequired,
  used: numberRequired,
  active: numberRequired,
  buffcache: numberRequired,
  available: numberRequired,
  swaptotal: numberRequired,
  swapused: numberRequired,
  swapfree: numberRequired
});

const fsSize = joi.object().keys({
  fs: stringRequired,
  type: stringRequired,
  size: numberRequired,
  used: numberRequired,
  use: numberRequired,
  mount: stringRequired
});

const fileSystem = joi.array().items(fsSize);

const fsStats = joi.object().keys({
  rx: numberRequired,
  wx: numberRequired,
  tx: numberRequired,
  rx_sec: numberRequired,
  wx_sec: numberRequired,
  tx_sec: numberRequired,
  ms: numberRequired
});

const disksIO = joi.object().keys({
  rIO: numberRequired,
  wIO: numberRequired,
  tIO: numberRequired,
  rIO_sec: numberRequired,
  wIO_sec: numberRequired,
  tIO_sec: numberRequired,
  ms: numberRequired
});

const cpu = joi.object().keys({
  load: numberRequired,
  load_user: numberRequired,
  load_system: numberRequired,
  load_nice: numberRequired,
  load_idle: numberRequired,
  load_irq: numberRequired,
  raw_load: numberRequired,
  raw_load_user: numberRequired,
  raw_load_system: numberRequired,
  raw_load_nice: numberRequired,
  raw_load_idle: numberRequired,
  raw_load_irq: numberRequired
});

const currentLoad = joi.object().keys({
  avgload: numberRequired,
  currentload: numberRequired,
  currentload_user: numberRequired,
  currentload_system: numberRequired,
  currentload_nice: numberRequired,
  currentload_idle: numberRequired,
  currentload_irq: numberRequired,
  raw_currentload: numberRequired,
  raw_currentload_user: numberRequired,
  raw_currentload_system: numberRequired,
  raw_currentload_nice: numberRequired,
  raw_currentload_idle: numberRequired,
  raw_currentload_irq: numberRequired,
  cpus: joi
    .array()
    .items(cpu)
    .required()
});

const networkStats = joi.object().keys({
  iface: stringRequired,
  operstate: stringRequired,
  rx: numberRequired,
  tx: numberRequired,
  rx_sec: numberRequired,
  tx_sec: numberRequired,
  ms: numberRequired
});

const systemMetrics = joi.object().keys({
  timestamp: numberRequired,
  mem: memory.required(),
  fs: fileSystem.required(),
  fsStats: fsStats.required(),
  disksIO: disksIO.required(),
  currentLoad: currentLoad.required(),
  networkStats: networkStats.required()
});

module.exports = {
  validateSchema,
  systemMetrics,
  memory,
  fileSystem,
  fsStats,
  disksIO,
  currentLoad,
  networkStats
};
