const api = require('./data.js')

const getDocument = api.get
const updateDocument = api.Update
const postDocument = api.Post
const deleteDocument = api.Delete
const getAllDocuments = api.getAll

module.exports = {
    get: getDocument,
    getAll: getAllDocuments,
    update: updateDocument,
    post: postDocument,
    delete: deleteDocument
}