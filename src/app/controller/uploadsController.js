let multer = require('multer')
let files = require('../middlewares/fileMiddleware')

module.exports = {

    index: function (req, res) {
        let courses = [ 
            {id_course: 1, course_name: "Ciência da Computação"},
            {id_course: 1, course_name: "Ciência da Computação"}
        ]

        console.log(courses)
        res.render("index", courses)
    },
    list: function (req, res) {
        files.get(req.con,
            function (err, rows) {
                if (err) console.error(err)
                console.table(rows)
                res.render("files", { files: rows })
            })
    },

    create: function (req, res) {
        console.log(req.body)
        files.create(req.con, req.body.file_name,
            function (err, rows) {
                if (err) console.error(err)
                console.table(rows)
                res.redirect("/files")
            })
    },

    edit: function (req, res) {
        const id = req.params.id
        const name = req.body;

        files.update(req.con, id, name,
            function (err, rows) {
                if (err) console.error(err)
                console.table(rows)
                res.redirect("/files")
            })
    },

    delete: function (req, res) {
        console.log(req.params)
        files.delete(req.con, req.params.id,
            function (err, rows) {
                if (err) console.error(err)
                console.table(rows)
                res.redirect("/files")
            })
    },

    fileUploadForm: function (req, res) {
        res.render('upload-form');
    },

    uploadFile: function (req, res) {
        let upload = multer({
            storage: fileUpload.files.storage(),
            allowedFile: fileUpload.files.allowedFile
        }).single('file');

        


        upload(req, res, function (err) {
            if (err instanceof multer.MulterError) {
                res.send(err);
            } else if (err) {
                console.error(err)
            } else {
                res.render('upload-form');
            }

        })

    }
}
