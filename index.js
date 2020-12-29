const express = require('express')
const sls = require('serverless-http')
const bodyParser = require('body-parser');
const cors = require('cors')

//Importing controller
const db = require('./Controller/dbController');

//Importing model
const { UserModel } = require('./Model/UserModel');

//For Swagger Api Documentation for local development
var swaggerUi = require('swagger-ui-express');
var swaggerDocument = require('./swagger.json');

//Initializing app
const app = express()
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
db.connect();
app.use(cors())

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


//userFunction Endpoint Start
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

//userFunction Endpoint End
//module.exports.server = sls(app)

/*
** To run on local machine **/
const server = app.listen(4000, function () {
  console.log(`App is running on 4000 Port`)
})
module.exports = server;

