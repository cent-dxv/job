const express = require('express')
const { Login ,Register} = require('../controllers')

router = express.Router()

router.route('/login').post(Login)
router.route('/register').post(Register)


module.exports = router;