const dbService = require('../../services/db.service')
const logger = require('../../services/logger.service')
const ObjectId = require('mongodb').ObjectId
const asyncLocalStorage = require('../../services/als.service')

async function query(filterBy = {}) {
    try {
        const criteria = _buildCriteria(filterBy)
        
        const collection = await dbService.getCollection('review')
        console.log('QUERY LINE 8', collection)

        // const reviews = await collection.find(criteria).toArray()
        var reviews = await collection.aggregate([
            {
                $match: criteria
            },
            {
                $lookup:
                {
                    localField: 'toyId',
                    from: 'review',
                    foreignField: 'toyId',
                    as: 'reviews'
                }
            },
            {
                $unwind: '$reviews'
            },
            {
                $lookup:
                {
                    localField: 'byUserId',
                    from: 'user',
                    foreignField: '_id',
                    as: 'byUser'
                }
            },
            {
                $unwind: '$byUser'
            }
        ]).toArray()
        reviews = reviews.map(review => {
            console.log('review 42:',review )
            review.reviews = { toyId: review.reviews.toyId, content: review.reviews.content }
            review.byUser = { _id: review.byUser._id, fullname: review.byUser.fullname }
            delete review.reviews
            delete review.byUserId
            return review
        })
        console.log('reviews 49:', reviews)
        return reviews
    } catch (err) {
        logger.error('cannot find reviews', err)
        throw err
    }
}

async function remove(reviewId) {
    try {
        const store = asyncLocalStorage.getStore()
        const { loggedinUser } = store
        const collection = await dbService.getCollection('review')
        // remove only if user is owner/admin
        const criteria = { _id: ObjectId(reviewId) }
        if (!loggedinUser.isAdmin) criteria.byUserId = ObjectId(loggedinUser._id)
        const {deletedCount} = await collection.deleteOne(criteria)
        return deletedCount
    } catch (err) {
        logger.error(`cannot remove review ${reviewId}`, err)
        throw err
    }
}

async function add(review) {
    console.log('critria query', review)
    try {
        const reviewToAdd = {
            byUserId: review.byUserId,
            toyId: review.toyId,
            content: review.content
        }
        console.log('review to add in function!:', reviewToAdd)
        const collection = await dbService.getCollection('review')
        
        const something = await collection.insertOne(reviewToAdd)
        console.log('something!!!:', something)
        return reviewToAdd;

    } catch (err) {
        logger.error('cannot insert review', err)
        throw err
    }
}

function _buildCriteria(filterBy) {
    const criteria = {}
    if (filterBy.byToyId) criteria.byToyId = filterBy.byToyId
    return criteria
}

module.exports = {
    query,
    remove,
    add
}


