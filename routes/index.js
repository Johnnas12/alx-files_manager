const express = require('express');
const AppController = require('../controllers/AppController');
const UserController = require('../controllers/UsersController');

const router = express.Router();

router.get('/status', AppController.getStatus);
router.get('/stats', AppController.getStats);

// route for users
router.post('/users', UserController.postNew);

module.exports = router;
