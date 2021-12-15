const express = require('express')
// const { requireAuth, requireAdmin } = require('../../middlewares/requireAuth.middleware')
const { log } = require('../../middlewares/logger.middleware')
const { getfeeds, getfeedById, addfeed, updatefeed, removefeed } = require('./feed.controller')
const router = express.Router()

// middleware that is specific to this router
// router.use(requireAuth)

router.get('/', log, getfeeds)
router.get('/:id', getfeedById)
router.post('/', addfeed)
router.put('/:id', updatefeed)
router.delete('/:id', removefeed)

// router.post('/', requireAuth, requireAdmin, addfeed)
// router.put('/:id', requireAuth, requireAdmin, updatefeed)
// router.delete('/:id', requireAuth, requireAdmin, removefeed)

module.exports = router