const mongoose = require('mongoose');
const mysql = require('mysql');
const config = require('config');

//connecting remote MongoDB 
module.exports.connectToMongo = () => {
    //For resolving unexpected warning generated by Mongoose
    mongoose.set('useUnifiedTopology', true);
    mongoose.set('useNewUrlParser', true);
    mongoose.connect('mongodb+srv://' + config.get('app_dbuser') + ':' + config.get('app_dbpassword') + '@' + config.get('mongoUrl') + '/' + config.get('database') + '?retryWrites=true&w=majority', { useNewUrlParser: true })
        .then(() => {
            console.log("Successful Mongodb connection...");
        })
        .catch(err => {
            console.log("Unable to connect..")
        })
}


//connecting to mysql AWS RDS through connection pooling
module.exports.connectToAWSMySqlRDS = () => {
    return mysql.createPool({
        host: config.get('app_mysql_host'),
        user: config.get('app_mysql_user'),
        password: config.get('app_mysql_password'),
        database: config.get('app_mysql_db'),
        connectionLimit: 1,
    });
}


//connecting to mysql AWS RDS through Raw connection 
module.exports.mysqlRaw = () => {
    return mysql.createConnection({
        host: config.get('app_mysql_host'),
        user: config.get('app_mysql_user'),
        password: config.get('app_mysql_password'),
        database: config.get('app_mysql_db'),
    });
}









