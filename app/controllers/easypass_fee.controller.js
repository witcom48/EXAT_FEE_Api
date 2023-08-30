const EasypassFeeModel = require("../schema/easypass_fee")
const mongoose = require('mongoose')
var moment = require ('moment')


exports.get = async (req, res) => {
  try {

    console.log(req.body)

    const filter = { 
      fee_status: req.body.status,
      fee_date: {
        $gte: new Date(req.body.fromdate).toISOString(),
        $lte: new Date(req.body.todate).toISOString()
      }, 
    
    };
    const doc = await EasypassFeeModel.find(filter);
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
    const fee = new EasypassFeeModel(body);

    const filter = { fee_doc: req.body.fee_doc };
    const doc = await EasypassFeeModel.findOne(filter);

    if (doc == null){
      //console.log('Insert')
      await fee.save().then((result) => {
        if (!result) {
          res.status(400)
          return res.json({ success: false, data: body, message: req.body.fee_doc + " was not insert." });       
        } else {
          res.status(200)
          return res.json({ success: true, data: result });
        }
      })
      .catch((err) => {
        console.error(err);     
        res.status(400)
        return res.json({ success: false, data: body, message: 'Error: ' + err });
      });
    }
    else{
     //console.log('Update')
      res.status(400)
      return res.json({ success: false, data: body, message: req.body.fee_doc + " is duplicate" });    

    //  await EasypassFeeModel.updateOne(filter, { $set: { tax_id: req.body.tax_id, branch_id: req.body.branch_id, address: req.body.address, fee_amount: req.body.fee_amount }}).then((result) => {
    //   if (!result) {
    //     res.status(400)
    //     return res.json({ success: true, data: req.body.fee_doc + " was not update." });       
    //   } else {
    //     res.status(200)
    //     return res.json({ success: true, data: fee });
    //   }
    //   })
    //   .catch((err) => {
    //     console.error(err);     
    //     res.status(400)
    //     return res.json({ success: false, data: 'Error: ' + err });
    //   });
    }

  }
  catch (error) {  
    res.status(400)
    return res.json({ success: false, data: 'Error: ' + error.message });
  }

};

exports.status = async (req, res) => {

  try {
    const { headers, body } = req;
    const fee = new EasypassFeeModel(body);

    const filter = { fee_doc: req.body.fee_doc };
    const doc = await EasypassFeeModel.findOne(filter);

    if (doc == null){
      
      res.status(400)
      return res.json({ success: false, message: req.body.fee_doc + " not found", data: body });  
      
    }
    else{     

      await EasypassFeeModel.updateOne(filter, { $set: { fee_status: req.body.fee_status }}).then((result) => {
        if (!result) {
          res.status(400)
          return res.json({ success: false, message: req.body.fee_doc + " was not update.", data: body });       
        } else {
          res.status(200)
          return res.json({ success: true, data: fee });
        }
      })
      .catch((err) => {
        console.error(err);     
        res.status(400)
        return res.json({ success: false, message: 'Error: ' + err, data: body });
      });
    }

  }
  catch (error) {  
    res.status(400)
    return res.json({ success: false, message: 'Error: ' + error.message });
  }

};