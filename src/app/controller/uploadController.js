let multer = require('multer')
let fileUpload = require('../middlewares/fileMiddleware')
const Uploads = require("../model/uploadModel")

module.exports = {

    fileUploadForm: function (req, res) {
        res.render('upload-form');
    },

    uploadFile: function (req, res) {

        console.log(req.body);
        console.log(req.params);

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

    },

    prueba: function (req, res) {
        res.download("src\\public\\files\\archivo_9.txt", function (error) {
            console.log("Error : ", error)
        })
    },

    listUploads: function (req, res) {
        console.log(req.params)
        const fkCourse = req.params.fk
        const fkTask = req.params.id

        Uploads.getAllUploadsByCourse(req.con, fkTask, (err, rows) => {
            if(err) console.error(err)


            console.table(rows)


            res.render('entregas', {uploads: rows});
        })
    }

}
