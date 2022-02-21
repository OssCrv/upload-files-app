const bcryptjs = require("bcryptjs");
const auth = require('../model/authModel')

module.exports = {

    login: function (req, res) {
        res.render('login');
    },

    auth: async function (req, res) {
        const { user, pass } = req.body;
        console.log(user, pass);
        auth.getByUsername(req.con, user,
            (err, result) => {
                if (err) console.error(err)

                if (result.length === 0 || !(bcryptjs.compare(pass, result[0].pass))) {
                    res.render('login');
                } else {
                    console.log(result);
                    req.session.loggedIn = true;
                    req.session.name = result[0].first_name;
                    res.redirect('/');
                }
            })
    },

    logout: function (req, res) {
        req.session.destroy(() => {
            console.log("Session destroyed");
            res.redirect("/login");
          })
    }

}
