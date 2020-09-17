const { Router } = require("express");
const router = Router();

const { getCode, getClient } = require("../../controllers/auth.facebook.controller");

router.route("/facebook").get(getClient);

router.route("/facebook/authorize").get(getCode);

module.exports = router;
