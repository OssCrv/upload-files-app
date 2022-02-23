const express = require('express');
const router = express.Router();

const courseController = require('../controller/courseController')
const uploadController = require('../controller/uploadController')
const taskController = require('../controller/taskController')
const authController = require('../controller/authController')

router.get('/', courseController.index);

router.get("/curso/:fk/tarea/:id", uploadController.listUploads)

router.get('/curso/:id', taskController.listTareas);

router.post("/upload/add/:fkTask", uploadController.uploadFile);

router.get('/upload', uploadController.fileUploadForm);
router.post('/upload', uploadController.uploadFile);

router.get('/login', authController.login);
router.post('/auth', authController.auth);
router.get('/logout', authController.logout)

router.get('/courses/', courseController.list);
router.post('/courses/create', courseController.create);
router.post('/courses/edit/:id', courseController.edit);
router.get('/courses/delete/:id', courseController.delete);

router.get('/tasks/', taskController.list);
router.post('/tasks/create', taskController.create);
router.post('/tasks/edit/:id', taskController.edit);
router.get('/tasks/delete/:id', taskController.delete);

module.exports = router;