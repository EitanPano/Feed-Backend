const feedService = require('./feed.service.js');
const logger = require('../../services/logger.service')

// GET LIST
async function getfeeds(req, res) {
  try {
    var queryParams = req.query;
    const feeds = await feedService.query(queryParams)
    res.json(feeds);
  } catch (err) {
    logger.error('Failed to get feeds', err)
    res.status(500).send({ err: 'Failed to get feeds' })
  }
}

// GET BY ID 
async function getfeedById(req, res) {
  try {
    const feedId = req.params.id;
    const feed = await feedService.getById(feedId)
    res.json(feed)
  } catch (err) {
    logger.error('Failed to get feed', err)
    res.status(500).send({ err: 'Failed to get feed' })
  }
}

// POST (add feed)
async function addfeed(req, res) {
  try {
    const feed = req.body;
    const addedfeed = await feedService.add(feed)
    res.json(addedfeed)
    console.log('addeded feed',addedfeed)
  } catch (err) {
    logger.error('Failed to add feed', err)
    res.status(500).send({ err: 'Failed to add feed' })
  }
}

// PUT (Update feed)
async function updatefeed(req, res) {
  try {
    const feed = req.body;
    // console.log(feed)
    const updatedfeed = await feedService.update(feed)
    res.json(updatedfeed)
  } catch (err) {
    logger.error('Failed to update feed', err)
    res.status(500).send({ err: 'Failed to update feed' })

  }
}

// DELETE (Remove feed)
async function removefeed(req, res) {
  try {
    const feedId = req.params.id;
    const removedId = await feedService.remove(feedId)
    console.log('removedId', removedId);
    res.send(removedId)
  } catch (err) {
    logger.error('Failed to remove feed', err)
    res.status(500).send({ err: 'Failed to remove feed' })
  }
}

module.exports = {
  getfeeds,
  getfeedById,
  addfeed,
  updatefeed,
  removefeed
}
