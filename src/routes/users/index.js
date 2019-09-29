const express = require("express");
const router = express.Router();

router.use(require("./getUser"));
router.use(require("./getGardens"));
router.use(require("./adoptGarden"));
router.use(require("./abandonGarden"));
router.use(require("./newPost"));

module.exports = router;
