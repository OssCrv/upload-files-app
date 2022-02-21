const multer = require('multer')


module.exports.files = {

    storage: function () {
        let storage = multer.diskStorage({
            destination: function (req, file, cb) {
                cb(null, './src/public/files')
            },
            filename: function (req, file, cb) {
                const fileName = file.originalname.toLowerCase().split(' ').join('-');
                cb(null, fileName)
            }
        })
        return storage
    },

    allowedFile: function (req, file, cb) {

        if (!file.originalname.match(/\.(pdf|doc|txt|jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF)$/)) {
            req.fileValidationError = 'Only  files are allowed!';
            return cb(new Error('Only  files are allowed!'), false)
        }
        cb(null, true);
    }
}