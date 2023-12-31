const express = require('express')
const router = express.Router()
const validationData = require('../validations/users')
const validationMiddleware = require('../middleware/validation')
const authorization  = require('../middleware/authorization')
const {
    create,
    login
}  = require('../controllers/users')
router.get('/user/create', validationMiddleware(validationData.create), create)
router.post('/user/login', validationMiddleware(validationData.validateLogin), login)

