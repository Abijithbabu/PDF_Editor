const {
  login,
  register,
  logOut,
  gLogin,
} = require("../controllers/userController");

const router = require("express").Router();

router.post("/login", login);
router.post("/gLogin", gLogin);
router.post("/register", register);
router.patch("/logout", logOut);

module.exports = router;
