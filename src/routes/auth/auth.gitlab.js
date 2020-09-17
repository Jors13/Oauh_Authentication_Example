const { Router } = require("express");
const router = Router();

const { getCode, getClient } = require("../../controllers/auth.gitlab.controller");

router.route("/gitlab").get(getClient);

router.route("/gitlab/authorize").get(getCode);

module.exports = router;
