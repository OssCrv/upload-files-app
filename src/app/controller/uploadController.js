let multer = require('multer')
let fileUpload = require('../middlewares/fileMiddleware')

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

    
}
