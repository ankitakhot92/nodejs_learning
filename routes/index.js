const express = require('express');

const router = express.Router();
const homeController = require('../controllers/home_controller');
const contactController = require('../controllers/contact_controller');
const signupController = require('../controllers/signup_controller');

router.get('/', homeController.home);
router.use('/users', require('./users.js'));
// router.get('/contact', contactController.contact);
// router.get('/signup', signupController.signup);

// router.post('/createuser', signupController.createuser);

console.log("Router loaded");

module.exports = router;