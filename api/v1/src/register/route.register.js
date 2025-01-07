const router = require("express").Router();
const registerController = require("./controller.register");
const authenticateToken = require("../../middleware/authHelper");
const validate = require("../../middleware/middleware.validation")
const loginValidation = require("./validation.login")
const registerValidation = require("./validation.register")
router.post("/create", validate(registerValidation), registerController.create);
router.post("/login", validate(loginValidation), registerController.login);
router.get("/getUserById/:id", authenticateToken, registerController.findSingleUser)
router.get("/allUsers", authenticateToken, registerController.findAllUsers);
router.patch("/updateUserById/:id", authenticateToken, registerController.updateUser);
router.delete("/deleteUserById/:id", authenticateToken, registerController.deleteUser);

module.exports = router;
