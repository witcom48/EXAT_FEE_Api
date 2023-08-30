const dbConfig = require("../configs/mongo.config");
const mongoose = require("mongoose");

async function connectMongo() {
    //databaseLog.info('connecting to mongodb...')
    
    const options = {
        useNewUrlParser: true,
        useUnifiedTopology: true,
       
    }

    mongoose.set("strictQuery", false);
    const mongo = mongoose.connect(
        //`mongodb://${dbConfig.USERNAME}:${dbConfig.PASSWORD}@${dbConfig.HOST}:${dbConfig.PORT}/?authMechanism=DEFAULT&authSource=${dbConfig.DB_NAME}`,
        `mongodb://${dbConfig.USERNAME}:${dbConfig.PASSWORD}@${dbConfig.HOST}:${dbConfig.PORT}/${dbConfig.DB_NAME}?retryWrites=true`,
        options)
        .then(() => console.log('Connected to MongoDB..'))
        .catch(err => console.log('Cannot connected to MongoDB..', err))
    // const connection = mongoose.connection
    // connection.on(
    //     'error',
    //     databaseLog.error.bind(console, 'connection error: '),
    // )
    // connection.once('open', function () {
    //     databaseLog.info('connection successfully')
    // })
    return mongo
}

module.exports = {
    connectMongo,    
}