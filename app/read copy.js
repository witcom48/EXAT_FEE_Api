const reader = require('xlsx')
  

//console.log('eiei')

// Reading our test file
const file = reader.readFile('D:/Temp/data_fee3.xlsx')

let data = []
  
const sheets = file.SheetNames
  
for(let i = 0; i < sheets.length; i++)
{
   const temp = reader.utils.sheet_to_json(
        file.Sheets[file.SheetNames[i]])
    temp.forEach((res) => {
      //data.push(res)

      const { CUST_ACCT_ID, PAN_NUM } = res

      console.log(res)

   })
}

console.log(data)

