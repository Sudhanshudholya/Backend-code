const router = require("express").Router()
const authenticateToken = require("../../middleware/authHelper")
const transactionController = require("./controller.transaction")
router.post("/create", authenticateToken, transactionController.create)
router.get("/getAll", authenticateToken, transactionController.getAll)
router.get("/getSingle/:id", authenticateToken, transactionController.getSingle)
router.patch("/updateTransaction/:id", authenticateToken, transactionController.updateTransaction)
router.delete("/deleteTransaction/:id", authenticateToken, transactionController.deleteTransaction)

module.exports = router