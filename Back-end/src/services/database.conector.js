var mysql = require('mysql');

// ToDo - export to Variables file

var connectionDetails = {
    host: "sql7.freesqldatabase.com",
    user: "sql7311824",
    database: "sql7311824",
    password: "3PruEnUnP8",
    port: 3306
}
// ToDo? - export connection to separate service
var databaseConnection = mysql.createConnection(connectionDetails);

databaseConnection.connect(function (err) { if (err) throw err; console.log("Connected!"); })

module.exports.checkForUser = function (login, password) {
    return new Promise(function (resolve, reject) {
        // Check if user exists in database, not the most secure solution.
        databaseConnection.query(`select * from Users WHERE Login = '${login}' AND Password  = '${password}'`, function (err, result) {
            if (err) throw err;
            if (result[0]) {
                resolve(result[0]);
            } else {
                reject();
            }
        });
    });
}

module.exports.getUserId = function (login, password) {
    return new Promise(function (resolve, reject) {
        // Get user id
        databaseConnection.query(`select * from Users WHERE Login = '${login}' AND Password  = '${password}'`, function (err, result) {
            if (err) throw err;
            if (result[0]) {
                resolve(result[0].Id);
            } else {
                reject();
            }
        });
    });
}

module.exports.getUsersWishlist = function (userId) {
    return new Promise(function (resolve, reject) {
        try {
            databaseConnection.query(`SELECT * FROM wish_list AS a WHERE user_id = ${userId}; `
                , function (err, result) {
                    if (err) {
                        reject()
                    } else {
                        if (result[0]) {
                            resolve(result);
                        } else {
                            reject();
                        }
                    }
                });
        } catch (e) {
            reject();

        }
    })

}

module.exports.checkIfMovieInWishlist = function (userId, movieId) {
    return new Promise(function (resolve, reject) {
        try {
            console.log(userId , movieId)
            databaseConnection.query(`SELECT * FROM wish_list AS a WHERE user_id = ${userId} AND movie_id = ${movieId}; `
                , function (err, result) {
                    if (err) {
                        reject()
                    } else {
                        if (result[0]) { resolve(true); } else { resolve(false); }
                    }
                });
        } catch (e) {
            reject();
        }
    })
}
module.exports.addItemToWishlist = function (userId, movieId) {
    return new Promise(function (resolve, reject) {
        try {
            databaseConnection.query(`INSERT INTO wish_list (id, user_id, movie_id) VALUES (NULL, ${userId}, ${movieId})`

            , function (err, result) {
                console.log(result)
                    if (err) {
                        reject()
                    } else {
                        if (result[0]) { resolve(true); } else { resolve(false); }
                    }
                });
        } catch (e) {
            reject();
        }
    })
}

