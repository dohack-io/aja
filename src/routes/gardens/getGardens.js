const express = require("express");
const router = express.Router();
const logger = require("../../logger");
const httpContext = require("express-http-context");
const Garden = require('../../models/garden')

router.post("/gardens/search", async (req, res, next) => {
  logger.info("POST /gardens/search", null, {
    reqId: httpContext.get("reqId"),
    body: req.body
  });
  // Todo!
  res.result = await Garden.closeTo();
  next();
});

module.exports = router;
