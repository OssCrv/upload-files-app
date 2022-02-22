module.exports = {
    getAll: function (con, callback) {
        con.query(`
        SELECT id_task, task_name, course_name, id_course 
        FROM tasks
            JOIN courses
            ON tasks.fk_course = courses.id_course;`,
            callback)
    },

    getById: function (con, id, callback) {
        con.query(`SELECT * FROM tasks WHERE id_task=${id}`, callback)
    },

    create: function (con, fk_course, task_name, callback) {
        con.query(`
            INSERT INTO tasks(task_name, fk_course) 
            VALUES ("${task_name}", ${fk_course})`,
            callback
        )
    },

    update: function (con, id, task_name, callback) {
        con.query(`
        UPDATE tasks 
        SET task_name=?
        WHERE id_task=?;
        `, [task_name, id], callback)
    },

    delete: function (con, id, callback) {
        con.query(`DELETE FROM tasks WHERE id_task=${id}`, callback)
    },

    getBycourse: function (con, fk, callback) {
        con.query(`SELECT * FROM tasks JOIN courses ON tasks.fk_course=courses.id_course WHERE fk_course=${fk};`, callback)
    }
}