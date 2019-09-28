const express = require("express");
const router = express.Router();
const logger = require("../../logger");
const httpContext = require("express-http-context");

router.get("/user/:id", async (req, res, next) => {
  logger.info("GET /user/%s", req.params.id, {
    reqId: httpContext.get("reqId")
  });
  res.result = { status: "OK" };
  next();
});

module.exports = router;
