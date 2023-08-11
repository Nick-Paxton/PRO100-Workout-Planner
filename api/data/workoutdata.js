const api = require("./data.js")

const getByUserID = async (db, collection, dateString, callback) => {
    let dateNumber = parseInt(dateString)
    query = { "userID": dateNumber }
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