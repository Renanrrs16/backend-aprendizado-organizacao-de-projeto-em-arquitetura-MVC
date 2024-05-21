const service = require('./personagem.service')

async function readAll(req, res) {
  // Acessamos a lista de personagens no Service
  const items = await service.readAll()

  // Enviamos a lista de personagens como resultado
  res.send(items)
}

async function readById(req, res) {
  // Acessamos o parametro de Rota ID
  const id = req.params.id

  //Acessamos o personagem no service atraves do ID
  const item = await service.readById(id)

  // Checamos se o item obtido e existente
  if (!item) {
    return res.status(404).send('Item não encontrado.')
  }

  // Enviamos o item como resposta
  res.send(item)
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