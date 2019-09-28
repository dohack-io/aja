const express = require("express");
const router = express.Router();
const logger = require("../../logger");
const httpContext = require("express-http-context");
const User = require("../../models/user");

router.get("/user/:id/gardens", async (req, res, next) => {
  logger.info("GET /user/%s/gardens", req.params.id, {
    reqId: httpContext.get("reqId")
  });
  const user = await User.getById(req.params.id);
  if (!user) {
    next({
      status: 404,
      message: "User not found"
    });
    return;
  }
  const gardens = await User.getGardensById(req.params.id);
  res.result = gardens;
  next();
});

module.exports = router;
