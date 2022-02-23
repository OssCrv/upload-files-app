module.exports = {
    getAll: function (con, callback) {
        con.query(`
        SELECT id_upload, upload_name, task_name, id_task 
        FROM uploads
            JOIN tasks
            ON uploads.fk_task = tasks.id_task;`,
            callback)
    },

    getById: function (con, id, callback) {
        con.query(`SELECT * FROM uploads WHERE id_upload=${id}`, callback)
    },

    create: function (con, fk_task, upload_name, callback) {
        con.query(`
            INSERT INTO uploads(upload_name, fk_task) 
            VALUES ("${upload_name}", ${fk_task})`,
            callback
        )
    },

    update: function (con, id, upload_name, callback) {
        con.query(`
        UPDATE uploads 
        SET upload_name=?
        WHERE id_upload=?;
        `, [upload_name, id], callback)
    },

    delete: function (con, id, callback) {
        con.query(`DELETE FROM uploads WHERE id_upload=${id}`, callback)
    },

    getBytask: function (con, fk, callback) {
        con.query(`SELECT * FROM uploads WHERE fk_task=${fk};`, callback)
    },

    getAllUploads: function (con, callback) {
        con.query(`SELECT id_upload, upload_name, student_name, is_delivered, task_name, course_name, path_file
        FROM uploads
            JOIN tasks
            ON uploads.fk_task = tasks.id_task
            JOIN courses
            ON tasks.fk_course = courses.id_course;`, callback)
    },
    getAllUploadsByCourse: function (con, fk, callback) {
        con.query(`SELECT *
        FROM uploads
            JOIN tasks
            ON uploads.fk_task = tasks.id_task
            WHERE tasks.fk_course = ${fk};`, callback)
    },
}