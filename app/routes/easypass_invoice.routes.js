
const express = require("express");
const router = express.Router();
const authenBasic = require('../middlewares/authentication.middleware')
const easypass_invoice = require("../controllers/easypass_invoice.controller")

router.post("/v1/invoice/get", authenBasic, easypass_invoice.get)
router.post("/v1/invoice/record", authenBasic, easypass_invoice.record)


module.exports = router;