const registerController = require("./controller.register")
const router = require("express").Router()
const authenticateToken = require("../../middleware/authHelper")
router.post("/add", registerController.add)
router.post("/login", registerController.login)
router.get("/getUserById/:id",authenticateToken,  registerController.findSingleUser)
router.get("/allUsers", authenticateToken, registerController.findAllUsers)
router.patch("/updateUserById/:id", authenticateToken, registerController.updateUser)
router.delete("/deleteUserById/:id", authenticateToken, registerController.deleteUser)
module.exports = router