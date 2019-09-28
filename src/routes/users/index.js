const express = require("express");
const router = express.Router();

router.use(require("./getUser"));
router.use(require("./newUser"));

module.exports = router;