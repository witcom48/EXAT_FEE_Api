const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const validator = require("validator");

const EasypassInvoiceSchema = new Schema({
  fee_doc: {
    type: String,
    required: [true, "Doc is required"]
  },
  fee_date: {
    type: Date,
    required: [true, "Date is required"]
  },
  fee_amount: {
    type: String,
    required: [true, "Fee is required"]
  },
  etax_doc: {
    type: String,
    required: [true, "Etax doc is required"]
  },
  etax_type: {
    type: String,
    required: [true, "Etax type is required"]
  },
  etax_data: {
    type: Object
  },  
  create_by: {
    type: String,
    required: [true, "Create by is required"]
  },
  create_date: {
    type: Date,
    required: [true, "Create date is required"]
  }  
});

const EasypassInvoice = (module.exports = mongoose.model("easypass_invoice", EasypassInvoiceSchema));