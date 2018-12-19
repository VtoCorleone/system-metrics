const {
  collectData,
  writeData,
  readData,
  deleteFile,
  fileExists
} = require("./index");
const {
  validateSchema,
  systemMetrics: systemMetricsSchema
} = require("./schemas");
const equal = require("assert").deepEqual;

describe("index.js", () => {
  describe("collectData()", () => {
    it("should validate system metrics payload", async () => {
      const result = await collectData();
      const joiResult = validateSchema(result, systemMetricsSchema);
      equal(joiResult.error, null);
    });
  });

  describe("writeData() & readData()", () => {
    let filePath;
    const data = {
      isData: true
    };
    it("should write the data", async () => {
      const result = await writeData(data);
      equal(typeof result, "string");
      filePath = result;
    });

    it("should have written the data", async () => {
      const result = await readData(filePath);
      equal(result, data);
    });

    it("should delete the file", async () => {
      const result = await deleteFile(filePath);
    });

    it("should be deleted", async () => {
      const result = await fileExists(filePath);
      equal(result, false);
    });
  });
});
