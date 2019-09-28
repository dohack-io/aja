const express = require("express");
const router = express.Router();
const logger = require("../../logger");
const httpContext = require('express-http-context');
const User = require('../../models/user')
const bCrypt = require('bcryptjs');

const createHash = function(password) {
  return bCrypt.hashSync(password, bCrypt.genSaltSync(11), null);
}

router.post("/auth/register", async (req, res, next) => {
  logger.info("POST /register", { reqId: httpContext.get("reqId") });
  data = {
    name: req.body.name,
    surname: req.body.surname,
    email: req.body.email,
    password: createHash(req.body.password)
  };
  try {
    const userId = await new User(data).save();
    res.result = { id: userId };
    next();
  } catch (error) {
    logger.error(error, { reqId: httpContext.get("reqId") });
    next(error);
  }
})

module.exports = router;