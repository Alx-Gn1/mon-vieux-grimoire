const express = require("express");
const router = express.Router();
const userCtrl = require("../controllers/user");
const { emailValidator, passwordValidator } = require("../middleware/credentialsValidator");

router.post("/signup", emailValidator, passwordValidator, userCtrl.signup);
router.post("/login", emailValidator, userCtrl.login);

module.exports = router;
