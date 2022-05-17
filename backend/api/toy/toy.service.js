const dbService = require('../../services/db.service')
const logger = require('../../services/logger.service')
const ObjectId = require('mongodb').ObjectId

async function query(filterBy) {
    try {
        // TODO const criteria = _buildCriteria(filterBy)
        const criteria = {}

        const collection = await dbService.getCollection('toy')
        let toys = await collection.find(criteria).toArray()
        return toys
    } catch (err) {
        logger.error('cannot find toys', err)
        throw err
    }
}

async function getById(toyId) {
    try {
        const collection = await dbService.getCollection('toy')
        const toy = collection.findOne({ _id: ObjectId(toyId) })
        return toy
    } catch (err) {
        logger.error(`while finding toy ${toyId}`, err)
        throw err
    }
}

async function remove(toyId) {
    try {
        console.log('toyId', toyId)
        const collection = await dbService.getCollection('toy')
        await collection.deleteOne({ _id: ObjectId(toyId) })
        return toyId
    } catch (err) {
        logger.error(`cannot remove toy ${toyId}`, err)
        throw err
    }
}

async function add(toy) {
    // TODO - add toy. description with make lorem
    try {
        const collection = await dbService.getCollection('toy')
        // const addedToy = await collection.insertOne(toy)
        await collection.insertOne(toy)
        // addedToy = addedToy.ops.pop()
        return toy
    } catch (err) {
        logger.error('cannot insert toy', err)
        throw err
    }
}

async function addUserReview(toy, review) {
    try {
        let id = ObjectId(toy._id)
        const collection = await dbService.getCollection('toy')
        const updatedToy = await collection.updateOne({ _id: id }, { $set: { ...toy, review: review } })
        return updatedToy
    } catch (err) {
        logger.error('cannot add review', err)
        throw err
    }
}

async function update(toy) {
    try {
        let id = ObjectId(toy._id)
        delete toy._id
        const collection = await dbService.getCollection('toy')
        await collection.updateOne({ _id: id }, { $set: { ...toy } })
        return toy
    } catch (err) {
        logger.error(`cannot update toy ${toyId}`, err)
        throw err
    }
}

module.exports = {
    remove,
    query,
    getById,
    add,
    update,
    addUserReview
}