const api = require("./data.js")

/**
 * Simple method that takes in a which database and collection you want to access 
 * along with a userID to find a specific user's workouts. Calls the callback function 
 * once the data has been retrieved.
 * @param {String} db Name of the database that is being accessed
 * @param {String} collection Name of the collection that is being accessed
 * @param {String} userID String version of the userID
 * @param {Function} callback Function to call once the data has been retrieved
 */
const getByUserID = async (db, collection, userID, callback) => {
    let ID = parseInt(userID)
    query = { "userID": ID }
    api.get(db,collection,query,callback)
}

const getDocument = api.get
const updateDocument = api.Update
const postDocument = api.Post
const deleteDocument = api.Delete

module.exports = {
    get: getDocument,
    getByUserID: getByUserID,
    Update: updateDocument,
    Post: postDocument,
    Delete: deleteDocument
}