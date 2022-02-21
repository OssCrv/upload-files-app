module.exports = {
    get: function (con, callback) {
        con.query("SELECT * FROM courses;", callback)
    },

    getById: function (con, id, callback) {
        con.query(`SELECT * FROM courses WHERE id_course=${id}`, callback)
    },

    create: function (con, course_name, callback) {
        con.query(`INSERT INTO courses(course_name) VALUES ("${course_name}")`, callback
        )
    },

    update: function (con, id, data, callback) {
        con.query(`
        UPDATE courses 
        SET course_name=?
        WHERE id_course=?;
        `, [data.course_name, id], callback)
    },

    delete: function (con, id, callback) {
        con.query(`DELETE FROM courses WHERE id_course=${id}`, callback)
    }
}