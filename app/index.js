const express = require('express');
const app = express();
var bodyParser = require('body-parser')
const dbService = require("./services/Connection");
const cors = require('cors')

const user = require("./routes/user.routes");

const easypass_fee = require("./routes/easypass_fee.routes");
const easypass_invoice = require("./routes/easypass_invoice.routes");

dbService.connectMongo()

app.get("/home", (req, res) => {
    res.json({ message: "!! M-Flow API" });
});

app.use(cors())

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

// app.use(tollsummary)
// app.use(cryto)
app.use(user)

app.use(easypass_fee)
app.use(easypass_invoice)

const port = 5000;
app.listen(port, (err) => {
    if (err) {
        systemLog.error(`App was error`, err)
        return
    }
    else{
        console.log(`Server is running on port : ${port}`)
    }
})
