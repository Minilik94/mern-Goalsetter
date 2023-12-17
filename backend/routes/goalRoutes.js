const express = require('express')
const { getGoals } = require('../controller/goalController')
const router = express.Router()


router.get('/', getGoals)

module.exports = router