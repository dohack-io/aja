const express = require("express");
const router = express.Router();
const logger = require("../../logger");
const httpContext = require("express-http-context");
const User = require("../../models/user");

router.get("/user/:id", async (req, res, next) => {
  logger.info("GET /user/%s", req.params.id, {
    reqId: httpContext.get("reqId")
  });
  try {
    const user = await User.getById(req.params.id);
    res.result = { id: userId };
    next();
  } catch (error) {
    logger.error(error, { reqId: httpContext.get("reqId") });
    next(error);
  }
  res.result = { status: "OK" };
  next();
});

module.exports = router;
