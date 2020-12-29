const mongoose = require('mongoose');
const config = require('config');

module.exports.connect = () => {
    //connecting database
    //For resolving unexpected warning generated by Mongoose
    mongoose.set('useUnifiedTopology', true);
    mongoose.set('useNewUrlParser', true);

    //connect to remote mongo database
    mongoose.connect('mongodb+srv://' + config.get('app_dbuser') + ':' + config.get('app_dbpassword') + '@' + config.get('mongoUrl') + '/' + config.get('database') + '?retryWrites=true&w=majority', { useNewUrlParser: true })
        .then(() => {
            console.log("Successful db connection");
        })
        .catch(err => {
            console.log("Unable to connect..")
        })
}





