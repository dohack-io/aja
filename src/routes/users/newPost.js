const express = require("express");
const router = express.Router();
const logger = require("../../logger");
const httpContext = require("express-http-context");
const User = require("../../models/user");
const Garden = require("../../models/garden");
const Post = require("../../models/post");

router.post("/user/:userid/garden/:gardenid/posts", async (req, res, next) => {
  logger.info(
    "POST /user/%s/garden/%s/posts",
    req.params.userid,
    req.params.gardenid,
    {
      reqId: httpContext.get("reqId")
    }
  );
  data = {
    text: req.body.text,
    author: req.params.userid,
    garden_id: req.params.gardenid
  };
  if(!data.text) {
    next({
      status: 401,
      message: "Post is empty"
    });
    return;
  }
  const user = await User.getById(req.params.userid);
  if (!user) {
    next({
      status: 404,
      message: "User not found"
    });
    return;
  }
  const garden = await Garden.getById(req.params.gardenid);
  if (!garden) {
    next({
      status: 404,
      message: "Garden not found"
    });
    return;
  }
  const post = await new Post(data).save();
  res.result = post;
  next();
});

module.exports = router;
