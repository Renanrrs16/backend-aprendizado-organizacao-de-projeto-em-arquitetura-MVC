const { getDatabase } = require("../db/database-connection")

function getCollection(){
  return getDatabase().collection('personagem')
}

function readAll() {
  return getCollection().find().toArray()
}

function readById() {
}

function create() {
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