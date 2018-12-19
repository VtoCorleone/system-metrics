const joi = require('joi')

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
  swapfree: numberRequired,
})

const fsSize = joi.object().keys({
  fs: stringRequired,
  type: stringRequired,
  size: numberRequired,
  used: numberRequired,
  use: numberRequired,
  mount: stringRequired,

})
const fileSystem = joi.array().items(fsSize)

module.exports = {
  validateSchema,
  memory,
  fileSystem
}