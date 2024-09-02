const express = require('express');
const AppController = require('../controllers/AppController');
const UserController = require('../controllers/UsersController');
const AuthController = require('../controllers/AuthController');
const FilesController = require('../controllers/FilesController');

const router = express.Router();

router.get('/status', AppController.getStatus);
router.get('/stats', AppController.getStats);

// route for users
router.post('/users', UserController.postNew);

// route for authentication
router.get('/connect', AuthController.getConnect);
router.get('/disconnect', AuthController.getDisconnect);
router.get('/users/me', UserController.getMe);

// Routes for file
router.post('/files', FilesController.postUpload); // upload files to databse
router.get('/files/:id', FilesController.getShow); // Add GET /files/:id endpoint
router.get('/files', FilesController.getIndex); // Add GET /files endpoint
module.exports = router;
