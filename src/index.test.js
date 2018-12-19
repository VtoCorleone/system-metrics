const { collectData } = require("./index")
const { validateSchema, memory: memorySchema, fileSystem: fsSchema } = require('./schemas')
const equal = require("assert").deepEqual

describe("index.js", () => {
  describe("collectData()", () => {
    it("should get memory", async () => {
      const data = await collectData()
      const { mem, timestamp } = data
      const joiResult = validateSchema(mem, memorySchema)
      equal(joiResult.error, null)
      equal(typeof timestamp, 'number')
    })
    
    it("should get fileSystem data", async () => {
      const data = await collectData()      
      const { fs } = data
      const joiResult = validateSchema(fs, fsSchema)
      equal(joiResult.error, null)
    })
  })
})