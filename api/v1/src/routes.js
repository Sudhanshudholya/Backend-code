const router = require('express').Router();
const registerRouter = require("./register/route.register")
const transactionRouter = require("./transaction/route.transaction")
router.use("/register", registerRouter)
router.use("/transaction", transactionRouter)

module.exports = router;