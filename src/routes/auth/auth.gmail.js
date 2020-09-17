const { Router } = require("express");
const router = Router();

const { getCode, getClient } = require("../../controllers/auth.gmail.controller");

router.route("/gmail").get(getClient);

router.route("/gmail/authorize").get(getCode);

module.exports = router;
