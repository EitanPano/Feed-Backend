const dbService = require('../../services/db.service')
const logger = require('../../services/logger.service')
const ObjectId = require('mongodb').ObjectId

async function query(filterBy) {
    try {
        // console.log('filterBy', filterBy);
        const criteria = _buildCriteria(filterBy)
        const sortCriteria = {}
        if (filterBy.sort) {    
            if (filterBy.sort === 'Name') sortCriteria.name = 1
            else if (filterBy.sort === 'Price') sortCriteria.price = 1
            else sortCriteria.createAt = 1
        }
        // console.log('sortCriteria', sortCriteria);
        const collection = await dbService.getCollection('feed')
        var feeds = await collection.find(criteria).sort(sortCriteria).toArray()
        // console.log('feeds', feeds);
        return feeds
    } catch (err) {
        logger.error('cannot find feeds', err)
        throw err
    }
}

async function getById(feedId) {
    try {
        const collection = await dbService.getCollection('feed')
        const feed = collection.findOne({ '_id': ObjectId(feedId) })
        return feed
    } catch (err) {
        logger.error(`while finding feed ${feedId}`, err)
        throw err
    }
}

async function remove(feedId) {
    try {
       
        const collection = await dbService.getCollection('feed')
        await collection.deleteOne({ '_id': ObjectId(feedId) })
        console.log('feedId remove', feedId)
        return feedId
    } catch (err) {
        logger.error(`cannot remove feed ${feedId}`, err)
        throw err
    }
}

async function add(feed) {
    try {
        const collection = await dbService.getCollection('feed')
        const addedfeed = await collection.insertOne(feed)
        return addedfeed.ops[0] // strange that we need to add the ops[0]!!
    } catch (err) {
        logger.error('cannot insert feed', err)
        throw err
    }
}
async function update(feed) {
    try {
        var id = ObjectId(feed._id)
        delete feed._id
        const collection = await dbService.getCollection('feed')
        // await collection.updateOne({ "_id": id }, { $set: { ...feed } })
        await collection.updateOne({ _id: id }, { $set: { ...feed } })
        feed._id = ObjectId(id);
        return feed;
    } catch (err) {
        logger.error(`cannot update feed ${feedId}`, err)
        throw err
    }
}

function _buildCriteria(filterBy) {
    // console.log('for criteria',filterBy)
    const criteria = {}
    if (filterBy.txt) {
        const txtCriteria = { $regex: filterBy.txt, $options: 'i' }
        criteria.email = txtCriteria
    }
    // console.log('criteria:', criteria);
    return criteria
}

async function _createfeeds() {
    const collection = await dbService.getCollection('feeds');
    await collection.insertMany([]);
}

module.exports = {
    remove,
    query,
    getById,
    add,
    update,
}
