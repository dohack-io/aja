const express = require("express");
const router = express.Router();

router.use(require("./getGardens"));
router.use(require("./gardenDetail"));

module.exports = router;
