const { MongoClient } = require('mongodb')

const uri = "mongodb+srv://user:user@cluster0.x37ivfp.mongodb.net/"

/**
 * This is a method just for this file. It connects to the database and executes the passed in query
 * @param {Function} query Query to execute in the database
 */
const executeQuery = async (query) => {
    const client = new MongoClient(uri)
    try {
        await query(client)
    } catch (err) {
        console.log(err)
    } finally {
        await client.close()
    }
}

/**
 * Simple method to retrieve a single document from the database
 * @param {String} db String of the name of the database to access
 * @param {String} collection String of the name of the collection to access
 * @param {Object} body Arguments for retrieving the document from the database. Needs to be in JSON format
 * @param {Function} callback Method to call with the data that is retrieved from the database.
 */
const getDocument = async (db, collection, body, callback) => {

    executeQuery(async (client) => {
        const database = client.db(db)
        const collect = database.collection(collection)
        let data = await collect.findOne(body)
        callback(data)
    })
}


const getAllDocuments = async (db, collection, body, callback) => {

    executeQuery(async (client) => {
        const database = client.db(db)
        const collect = database.collection(collection)
        let data = await collect.find()
        let array = []
        for await (const doc of data) {
            array.push(doc)
        }
        callback(array)
    })
}


/**
 * Simple method to update a document in the database
 * @param {String} db String of the name of the database to access
 * @param {String} collection String of the name of the collection to access
 * @param {Object} body Arguments for updating the document. Needs to be in JSON format
 * @param {Function} callback Method to call once the document has been updated
 */
const updateDocument = async (db, collection, body, callback) => {

    executeQuery(async (client) => {
        const database = client.db(db)
        const collect = database.collection(collection)
        const options = body['options']

        const doc = {
            $set: body["$set"]
        }

        const query = {id: body['id'] }
        await collect.updateOne(query, doc, options)
        callback()
    })
}

/**
 * Simple method for inserting a single document into the database
 * @param {String} db String of the name of the database to access
 * @param {String} collection String of the name of the collection to access
 * @param {Object} body Arguments for inserting the document into the database. Should have all the proper elements of a the document type
 * @param {Function} callback Method to call once the document has been inserted into the database
 */
const postDocument = async (db, collection, body, callback) => {
    
    executeQuery(async (client) => {
        const database = client.db(db)
        const collect = database.collection(collection)
        const doc = body
        await collect.insertOne(doc)
        callback()
    })
    
}

/**
 * Simple method for deleting a single document from the database
 * @param {String} db String of the name of the database to access
 * @param {String} collection String of the name of the collection to access
 * @param {Object} body Arguments to delete a single document from the database. Should have a way to get a unique document
 * @param {Function} callback Method to call once the document has been deleted from the database
 */
const deleteDocument = async (db, collection, body, callback) => {
    
    executeQuery(async (client) => {
        const database = client.db(db)
        const collect = database.collection(collection)

        const query = {userID: body['userID']}
        await collect.deleteOne(query)

        callback()
    })
}

module.exports = {
    get: getDocument,
    getAll: getAllDocuments,
    Update: updateDocument,
    Post: postDocument,
    Delete: deleteDocument
}