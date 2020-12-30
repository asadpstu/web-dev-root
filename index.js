const express = require('express')
const cors = require('cors')
const sls = require('serverless-http')
const bodyParser = require('body-parser');
const config = require('config');

//Importing model
const { UserModel } = require('./Model/UserModel');

//Importing controller
const { connectToMongo, connectToAWSMySqlRDS, mysqlRaw } = require('./Controller/dbController');
const { getUsers, createUser } = require('./Controller/customController');


//For Swagger Api Documentation for local development
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

//Initializing app
const app = express()
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors())

//Db connection initialization
connectToMongo();
global.connectToMySql = connectToAWSMySqlRDS();

//Starting point
app.get('/', function (req, res) {
  res.redirect('/api-docs');
});
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));


//Heartbeat
app.get('/heartbeat', async (req, res, next) => {
  res.status(200).send({
    "status": "success",
    "response": "Service is up and running"
  });
})

//userFunctionMongo Endpoint Start
app.post('/user/create', async (req, res, next) => {
  const bodyData = {
    "name": req.body.name,
    "roll": req.body.roll,
    "country": req.body.country
  }
  const user = new UserModel(bodyData);
  const save = await user.save();
  res.status(200).send({
    "status": "success",
    "response": "New user created",
    "user": save
  });
})

app.delete('/user/delete', async (req, res, next) => {
  const userId = req.body.userId;
  const user = UserModel.remove({ _id: userId }, function (err) {
    if (!err) {
      res.status(200).send({
        "status": "success",
        "statusCode": 204,
        "response": "User deleted",
      });
    }
    else {
      res.status(200).send({
        "status": "failed",
        "statusCode": 422,
        "response": "Can't delete User",
      });
    }
  });
})

app.put('/user/update', async (req, res, next) => {
  const userId = req.body.userId;
  const name = req.body.userName;
  const country = req.body.userCountry;
  try {
    var user = await UserModel.findOne({ "_id": userId });
    if (!user) {
      res.status(200).send({
        "status": "Not Found",
        "statusCode": 404,
        "result": "user not found"
      });
      return;
    }
    user.name = name;
    user.country = country;
    const update = await user.save();
    res.status(200).send({
      "status": "success",
      "message": "User information Updated",
      "response": update
    });
  }
  catch (e) {
    res.status(200).send({
      "status": "failed",
      "statusCode": 422,
      "message": "All fields are mandatory", e,
    });
  }

})

//userFunctionMysql
app.get('/mysql/user/get', (req, res) => {
  getUsers().then(users => {
    console.log(users);
    res.send(users)
  }).catch(err => console.error(err));
});

app.post('/mysql/user/create', (req, res) => {
  createUser(req).then(users => res.send(users)).catch(err => console.error(err));
});



// For testing connection pooling problem with raw connection string
const db_connection = mysqlRaw();
db_connection.connect((err) => {
  if (err) console.error(err);
  console.log('MySQL Raw Connection Established.');
});

const getUsersAttack = () => new Promise((resolve, reject) => {
  db_connection.query('SELECT * FROM users', (err, results) => {
    if (err) reject(err);
    console.log('User Query Results: ', results);
    resolve(results);
    db_connection.end(err => { if (err) reject(err) });
  });
});

app.get('/attack', (req, res) => {
  getUsersAttack()
    .then(users => res.send(users))
    .catch(err => console.error(err));
});


/*
 ** To deploy in aws lambda **/
module.exports.server = sls(app)
/** To deploy in aws lambda **/


/*
** To run on local machine

  const server = app.listen(config.get('port'), function () {
    console.log("App is running on Port :",config.get('port'))
  })
  module.exports = server;

  ** To run on local machine **
*/



