const express = require("express");
const router = express.Router();


if (process.env.NODE_ENV === "development") {
  // Development error handler will pass stacktrace
  router.use(function(err, req, res, next) {
    res.status(err.httpCode || 500);
    res.json({ error: { ...err, message: err.message, stack: err.stack } });
  });
} else {
  router.use(function(err, req, res, next) {
    res.status(err.httpCode || 500);
    res.json({
      error: err.message
    });
  });
}

module.exports = router;
