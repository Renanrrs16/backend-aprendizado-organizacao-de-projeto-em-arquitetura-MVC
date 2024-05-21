const { ObjectId } = require('mongodb')
const { getDatabase } = require("../db/database-connection")

function getCollection() {
  return getDatabase().collection('personagem')
}

function readAll() {
  // Acessamos a lista de personagens na collection do MongoDB
  return getCollection().find().toArray()
}


/**
 * 
 * @param {string} id 
 * @returns 
 */
function readById(id) {
  // Retornar o item na Collection usando o ID
  return getCollection().findOne({ _id: new ObjectId(id) })
}

function create(newItem) {
  // Adicionamos na Colletion
  return getCollection().insertOne(newItem)
}

function updateById() {
}

function deleteByID() {
}

module.exports = {
  readAll,
  readById,
  create,
  updateById,
  deleteByID
}