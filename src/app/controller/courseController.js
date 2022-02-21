const courses = require("../model/courseModel")

module.exports = {

    index: function (req, res) {
        console.log(req.session)
        courses.get(req.con,
            function (err, rows) {
                if (err) console.error(err)
                res.render("index", {
                    courses: rows, activeSession: {
                        loggedIn: req.session.loggedIn,
                        name: req.session.name
                    }
                })
            })
    },
    list: function (req, res) {
        courses.get(req.con,
            function (err, rows) {
                if (err) console.error(err)
                res.render("courses", {
                    courses: rows, activeSession: {
                        loggedIn: req.session.loggedIn,
                        name: req.session.name
                    }
                })
            })
    },

    create: function (req, res) {
        courses.create(req.con, req.body.course_name,
            function (err, rows) {
                if (err) console.error(err)
                res.redirect("/courses")
            })
    },

    edit: function (req, res) {
        const id = req.params.id
        const name = req.body;

        courses.update(req.con,
            id,
            name,
            function (err, rows) {
                if (err) console.error(err)
                res.redirect("/courses")
            })
    },

    delete: function (req, res) {
        courses.delete(req.con, req.params.id,
            function (err, rows) {
                res.redirect("/courses")
            })
    },

    prueba: function (req, res) {
        console.log(req.params)
        res.render("uploader")
    }
}
