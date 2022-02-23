const Tasks = require("../model/taskModel")
const Courses = require("../model/courseModel")
const Uploads = require("../model/uploadModel")

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
    },

    listTareas: function (req, res) {
        console.log("req.params.id")
        console.log(req.params.id)

        const fkCourse= req.params.id
        let course = {}
        let tasks = []
        
        Tasks.getBycourse(req.con, fkCourse, (err, rows) => {
            if(err) console.error(err)
            
            console.log("Tasks.getBycourse")
            console.table(rows)
            
            rows.forEach(row => {
                if(!course.course_name) course.course_name = row.course_name
                if(!tasks.includes(row.task_name)) {
                    let aux = {}
                    aux.id_task = row.id_task
                    aux.task_name = row.task_name
                    aux.students = []
                    tasks.push(aux)
                }
            })

            console.log("course")
            console.log(course)
            console.log("tasks")
            console.table(tasks)
            
            Uploads.getAllUploadsByCourse(req.con, fkCourse, (err, rows) => {
                if(err) console.log(err)
                
                console.log("Uploads.getAllUploadsByCourse")
                console.table(rows)

                tasks.forEach(task => {
                    rows.forEach(row => {
                        if(row.task_name == task.task_name) task.students.push(row.student_name)
                    })
                })

                console.log("tasks")
                console.log(tasks)
                

                res.render("tareas", {
                    fkCourse: fkCourse,
                    tasks: tasks
                })
                
            })
        })
    }
}
