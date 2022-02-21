const Tasks = require("../model/taskModel")
const Courses = require("../model/courseModel")

module.exports = {
    list: function (req, res) {
        Tasks.getAll(req.con,
            function (err, rows) {
                if (err) console.error(err)
                let tasks = rows

                console.log(rows)
                Courses.get(req.con, (err, rows) => {
                    if (err) console.error(err)
                    let courses = rows.map(row => row.course_name)

                    res.render("tasks", {
                        tasks: tasks, courses: courses,
                        activeSession: {
                            loggedIn: req.session.loggedIn,
                            name: req.session.name
                        }
                    })
                })
            }
        )
    },

    create: function (req, res) {
        let fkCourse
        taskName = req.body.task_name
        courseName = req.body.course_name

        Courses.get(req.con, (err, rows) => {
            if (err) console.error(err)
            fkCourse = rows.filter(course => {
                return course.course_name == req.body.course_name
            }).map(course => course.id_course)

            Tasks.create(req.con, fkCourse, taskName, (err, rows) => {
                if (err) console.error(err)
                res.redirect("/tasks")
            })
        })

    },

    edit: function (req, res) {
        const id = req.params.id
        const name = req.body.task_name;

        Tasks.update(req.con, id, name, function (err, rows) {
            if (err) console.error(err)
            res.redirect("/tasks")
        })
    },

    delete: function (req, res) {
        Tasks.delete(req.con, req.params.id,
            function (err, rows) {
                if (err) console.error(err)
                res.redirect("/tasks")
            })
    }
}
