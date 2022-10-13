const router = require('express').Router()
const {
    getDisable,
    getEnable,getRunning
} = require('../controller/admin-attendance')

router.get('/enable', getEnable)
router.get('/disable', getDisable)
router.get('/running', getRunning)

module.exports = router