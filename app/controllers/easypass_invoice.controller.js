const EasypassInvoiceModel = require("../schema/easypass_invoice")
const mongoose = require('mongoose')
var moment = require ('moment')


exports.get = async (req, res) => {
  try {
    const doc = await EasypassInvoiceModel.find();
    return res.json({ success: true, data: doc });
  }
  catch (error) {  
    res.status(400)
    return res.json({ success: false, data: 'Error: ' + error.message });
  }
};  

exports.record = async (req, res) => {

  try {
    const { headers, body } = req;
    const invoice = new EasypassInvoiceModel(body);

    const filter = { fee_doc: req.body.fee_doc };
    const doc = await EasypassInvoiceModel.findOne(filter);

    if (doc == null){
      //console.log('Insert')

      await invoice.save().then((result) => {
        if (!result) {
          res.status(400)
          return res.json({ success: false, message: req.body.fee_doc + " was not insert.", data: body });       
        } else {
          res.status(200)
          return res.json({ success: true, data: result });
        }
      })
      .catch((err) => {
        console.error(err);     
        res.status(400)
        return res.json({ success: false, message: 'Error: ' + err, data: body });
      });

    }
    else{
    
        res.status(400)
        return res.json({ success: false, message: req.body.fee_doc + " is duplicate", data: body });       
      
    }


  }
  catch (error) {  
    res.status(400)
    return res.json({ success: false, message: 'Error: ' + error.message });
  }

};

