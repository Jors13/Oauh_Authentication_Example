const { Router } = require("express");
const router = Router();

const { getUser } = require("../../controllers/users.controller");

router.route("/").post(getUser);

module.exports = router;
