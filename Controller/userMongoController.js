const { UserModel } = require('../Model/UserModel');

module.exports.usercreate = async (req, res, next) => {
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
}


module.exports.userdelete = async (req, res, next) => {
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
}


module.exports.userupdate = async (req, res, next) => {
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

}