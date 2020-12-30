module.exports.getUsers = () => new Promise((resolve, reject) => {
    // ** connectToMySql ** this is a global variable. I've declared it inside index.js file.
    connectToMySql.getConnection((err, connection) => {
        if (err) reject(err);
        console.log('MySQL Connection ID: ', connection.threadId);
        connection.query('SELECT * FROM users', (err, results) => {
            if (err) reject(err);
            resolve(results);
            connection.release(err => { if (err) console.error(err) });
        });
    });
});


module.exports.createUser = (req) => new Promise((resolve, reject) => {
    // ** connectToMySql ** this is a global variable. I've declared it inside index.js file.
    connectToMySql.getConnection((err, connection) => {
        if (err) reject(err);
        console.log('MySQL Connection ID: ', connection.threadId);

        var name = req.body.name;
        var roll = req.body.roll;
        var country = req.body.country;

        connection.query('INSERT INTO users (name, roll, country) VALUES ("' + name + '", "' + roll + '", "' + country + '");', (err, results) => {
            if (err) reject(err);
            resolve(results);
            connection.release(err => { if (err) console.error(err) });
        });
    });
});