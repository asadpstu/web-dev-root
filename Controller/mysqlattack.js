const { mysqlRaw } = require('../Controller/dbController');
const db_connection = mysqlRaw();

// For testing connection pooling problem with raw connection string

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


module.exports.mysqlAttack = (req, res) => {
    getUsersAttack()
        .then(users => {
            console.log(users)
            res.send(users)
        })
        .catch(err => res.send({
            "status": "failed",
            "message": "Connection lost", err
        }));
}