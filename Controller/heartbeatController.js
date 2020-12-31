module.exports.heartbeat = async (req, res, next) => {
    res.status(200).send({
        "status": "success",
        "response": "Service is up and running"
    });
}

module.exports.redirect = async (req, res, next) => {
    res.redirect('/api-docs');
}