const router = require("express").Router();
const { signup, login } = require("../controllers/users.controllers");

router.route("/local/signup").post(signup);
router.route("/local/login").post(login);

module.exports = router;
