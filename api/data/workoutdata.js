const api = require("./data.js")

const getWorkoutByDate = async (db, collection, dateString, callback) => {
    let dateNumber = parseInt(dateString)
    query = { "ID": dateNumber }
    api.get(db,collection,query,callback)
}

const getDocument = api.get
const updateDocument = api.Update
const postDocument = api.Post
const deleteDocument = api.Delete

module.exports = {
    get: getDocument,
    getByDate: getWorkoutByDate,
    Update: updateDocument,
    Post: postDocument,
    Delete: deleteDocument
}