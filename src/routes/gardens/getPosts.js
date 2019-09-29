const express = require("express");
const router = express.Router();
const logger = require("../../logger");
const httpContext = require("express-http-context");
const Post = require('../../models/post');

router.get("/garden/:id/posts", async (req, res, next) => {
  logger.info("GET /garden/%s/posts", req.params.id, {
    reqId: httpContext.get("reqId")
  });
  if (isNaN(req.params.id) || req.params.id < 0) {
    next(new ValidationError("Invalid garden Id"));
    return;
  }
  const posts = await Post.getByGardenId(req.params.id);
  res.result = posts;
  next();
});

module.exports = router;
