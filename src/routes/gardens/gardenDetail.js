const express = require("express");
const router = express.Router();
const logger = require("../../logger");
const httpContext = require("express-http-context");
const Garden = require("../../models/garden");
const Team = require("../../models/team");
const ValidationError = require("../../errors/validationError");

router.get("/garden/:id", async (req, res, next) => {
  logger.info("GET /gardens/%s", req.params.id, {
    reqId: httpContext.get("reqId")
  });
  if (isNaN(req.params.id) || req.params.id < 0) {
    next(new ValidationError("Invalid garden Id"));
    return;
  }
  let garden = await Garden.getById(req.params.id);
  if (!garden) {
    next({
      status: 404,
      message: "Garden not found"
    });
    return;
  }
  if (garden.team_id) {
    garden.team = await Team.getNameById(garden.team_id);
    delete garden.team_id;
  }
  res.result = garden;
  next();
});

module.exports = router;
