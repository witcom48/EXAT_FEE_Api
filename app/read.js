const reader = require('xlsx')
var moment = require ('moment')
const EasypassFeeModel = require("../app/schema/easypass_fee")
const dbService = require("../app/services/Connection");

//-- Connect mongo
dbService.connectMongo()

// Reading our test file
const file = reader.readFile('D:/Temp/data_100000.xlsx')
  
const sheets = file.SheetNames
  
for(let i = 0; i < sheets.length; i++)
{
   const temp = reader.utils.sheet_to_json(file.Sheets[file.SheetNames[i]])
    temp.forEach( async (res) => {
      
      const { TXN_NO, SETTLE_DATE, MAINTENANCE_FEE, CUST_ACCT_ID, PAN_NUM, SMARTCARD_ID, CUST_TYPE, TITLE, GIVEN_NAME, FAMILY_NAME, IC_PASSPORT_NUM, TAX_ID, BRANCH_ID, ADDRESS2, PLATE_NO, EMAIL } = res

      const fee = new EasypassFeeModel();
      fee.fee_doc = TXN_NO
      fee.fee_date = moment(SETTLE_DATE.substring(0, 10), "YYYY/MM/DD")
      fee.fee_amount = MAINTENANCE_FEE
      fee.fee_status = "W"
      fee.cust_acct_id = CUST_ACCT_ID
      fee.pan_num = PAN_NUM
      fee.smartcard_id = SMARTCARD_ID
      fee.cust_type = CUST_TYPE    
      fee.title = TITLE
      fee.fname = GIVEN_NAME
      fee.lname = FAMILY_NAME
      fee.tax_id = IC_PASSPORT_NUM
      fee.branch_id = BRANCH_ID
      fee.address = ADDRESS2
      fee.plate_no = PLATE_NO
      fee.email = EMAIL
      fee.etax_consent = 'N'

      const filter = { fee_doc: fee.fee_doc };
      const doc = await EasypassFeeModel.findOne(filter);

      let success = 0

      if (doc == null){
         await fee.save().then((result) => {
            if (!result) {
               console.log(result) 
            } else {
               success++
               console.log('1 rows add')                 
               console.log(success)  
            }
          })
          .catch((err) => {
            console.log(err)               
          });
      }
      
   })
}
