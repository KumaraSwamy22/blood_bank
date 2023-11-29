const express = require('express')
const { registerController, loginController, currentUserController } = require('../controllers/authController');
const authMiddleware = require('../middlewares/authMiddleware');

//router object
const router = express.Router();

//routes
//register by post
router.post('/register',registerController);

//login 
router.post('/login',loginController)

//get current user by get
router.get('/current-user',authMiddleware,currentUserController)


module.exports = router;