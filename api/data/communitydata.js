const api = require('./data.js')

const getDocument = api.get
const updateDocument = api.Update
const postDocument = api.Post
const deleteDocument = api.Delete

module.exports = {
    get: getDocument,
    update: updateDocument,
    post: postDocument,
    delete: deleteDocument
}