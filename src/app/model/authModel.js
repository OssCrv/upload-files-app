module.exports = {
    getByUsername: function (con, username, callback) {
        con.query(`SELECT * FROM users WHERE user = "${username}"`, callback)
    }
}