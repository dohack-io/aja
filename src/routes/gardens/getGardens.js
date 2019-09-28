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
  if( !isNaN(req.body.radius) && !isNaN(req.body.longitude) && !isNaN(req.body.latitude) ) {
    // radius search
    res.result = await Garden.inRadius({radius: req.body.radius, longitude: req.body.longitude, latitude: req.body.latitude });
  } else {
    res.result = await Garden.closeTo();
  }
  next();
});

module.exports = router;
