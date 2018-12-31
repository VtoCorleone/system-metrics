const { collectMetrics } = require("./index");
const config = require("./config");
setInterval(async () => {
  const data = await collectMetrics();
  console.log("data:", data);
}, 1000);
