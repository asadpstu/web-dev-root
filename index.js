const express = require('express')
const cors = require('cors')
const config = require('config');
const sls = require('serverless-http')
const bodyParser = require('body-parser');


//For Swagger Api Documentation for local development
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

//Importing db connection 
const { connectToMongo, connectToAWSMySqlRDS } = require('./Controller/dbController');

//importing route
const userRoute = require("./Route/userRoute");
const mysqlRoute = require("./Route/mysqlRoute");
const heartbeatRoute = require("./Route/heartbeatRoute");


//Initializing app
const app = express()
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors())

//db connection initialization
connectToMongo();
global.connectToMySql = connectToAWSMySqlRDS();



//app end point
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use("/", heartbeatRoute)
app.use("/user", userRoute);
app.use("/mysql", mysqlRoute);


/*
 ** To deploy in aws lambda 
    module.exports.server = sls(app)
/** To deploy in aws lambda **/


/*
** To run on local machine*/

const server = app.listen(config.get('port'), function () {
  console.log("App is running on Port :", config.get('port'))
})
module.exports = server;

/** To run on local machine **
*/



