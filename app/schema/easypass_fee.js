const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const validator = require("validator");

const EasypassFeeSchema = new Schema({
  fee_doc: {
    type: String,
    required: [true, "Doc is required"]
  },
  fee_date: {
    type: Date,
    required: [true, "Date is required"]
  },
  fee_amount: {
    type: Number,
    required: [true, "Fee is required"]
  },
  fee_status: {
    type: String,
    required: [true, "Status is required"]
  },

  cust_acct_id: {
    type: String,
    required: [true, "CUST_ACCT_ID is required"]
  },
  pan_num: {
    type: String,
    required: [true, "PAN_NUM is required"]
  },
  smartcard_id: {
    type: String,
    required: [true, "Smartcard is required"]
  },
  cust_type: {
    type: String,
    required: [true, "Customer type is required"]
  },
  title: {
    type: String
  },
  fname: {
    type: String
  },
  lname: {
    type: String
  },
  tax_id: {
    type: String
  },
  branch_id: {
    type: String
  },
  address: {
    type: String
  },
  plate_no: {
    type: String
  },
  email: {
    type: String
  },
  etax_consent: {
    type: String
  },
  
});

const EasypassFee = (module.exports = mongoose.model("easypass_fee", EasypassFeeSchema));