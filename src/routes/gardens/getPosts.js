const express = require("express");
const router = express.Router();
const logger = require("../../logger");
const httpContext = require("express-http-context");
const Post = require('../../models/post');
const User = require('../../models/user');

router.get("/garden/:id/posts", async (req, res, next) => {
  logger.info("GET /garden/%s/posts", req.params.id, {
    reqId: httpContext.get("reqId")
  });
  if (isNaN(req.params.id) || req.params.id < 0) {
    next(new ValidationError("Invalid garden Id"));
    return;
  }
  let posts = await Post.getByGardenId(req.params.id);
  const authors = await Promise.all(posts.map(post => post.author).filter((v, i, a) => a.indexOf(v) === i).map(author => User.getById(author).then(author => {
    delete author.password;
    return author;
  })))
  posts = posts.map(post => {
    post.author = authors.find(author => post.author === author.id);
    return post;
  })
  res.result = posts;
  next();
});

module.exports = router;
