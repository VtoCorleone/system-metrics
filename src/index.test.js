const {
  getData,
  writeData,
  readData,
  deleteFile,
  fileExists,
  collectMetrics
} = require("./index");
const {
  validateSchema,
  systemMetrics: systemMetricsSchema
} = require("./schemas");
const equal = require("assert").deepEqual;

describe("index.js", () => {
  describe("getData()", () => {
    it("should validate system metrics payload", async () => {
      const result = await getData();
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
      await deleteFile(filePath);
    });

    it("should be deleted", async () => {
      const result = await fileExists(filePath);
      equal(result, false);
    });
  });

  describe("collectMetrics()", () => {
    let filePath;
    it("should write metrics to a file", async () => {
      filePath = await collectMetrics();
      equal(typeof filePath, "string");
    });

    it("should have written the data", async () => {
      const result = await readData(filePath);
      const joiResult = validateSchema(result, systemMetricsSchema);
      equal(joiResult.error, null);
    });

    afterAll(async () => {
      await deleteFile(filePath);
    });
  });
});
