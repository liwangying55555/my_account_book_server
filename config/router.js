const router = require('express').Router()

// controllers
const data = require('../controllers/data.controller')
const user = require('../controllers/user.controller')
const icon = require('../controllers/icon.controller')

// router
router.get('/api/timeline', data.getTimeline)
router.get('/api/initUsers', user.initUsers)
router.get('/api/initIcon', icon.initIcon)

module.exports = router