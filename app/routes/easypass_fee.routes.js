
const express = require("express");
const router = express.Router();
const authenBasic = require('../middlewares/authentication.middleware')
const easypass_fee = require("../controllers/easypass_fee.controller")

router.post("/v1/fee/get", authenBasic, easypass_fee.get)
router.post("/v1/fee/record", authenBasic, easypass_fee.record)
router.post("/v1/fee/status", authenBasic, easypass_fee.status)

module.exports = router;