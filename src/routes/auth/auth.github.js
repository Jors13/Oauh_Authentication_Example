const { Router } = require("express");
const router = Router();

const { getCode, getClient } = require("../../controllers/auth.github.controller");

router.route("/github").get(getClient);

router.route("/github/authorize").get(getCode);

module.exports = router;
