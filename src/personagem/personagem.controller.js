const service = require('./personagem.service')

async function readAll(req, res) {
  const items = await service.readAll()

  res.send(items)
}

function readById(req, res) {
  res.send('read by ID')
}

function create(req, res) {
  res.send('Create')
}

function updateById(req, res) {
  res.send('Update by ID')
}

function deleteByID(req, res) {
  res.send('Delete by ID')
}

module.exports = {
  readAll,
  readById,
  create,
  updateById,
  deleteByID
}