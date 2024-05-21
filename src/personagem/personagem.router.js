const express = require('express')
const { readAll, readById, create, updateById, deleteByID } = require('./personagem.controller')

const router = express.Router()



router.get('/', readAll)
router.get('/:id', readById)
router.post('/', create)
router.put('/:id', updateById)
router.delete('/:id', deleteByID)

module.exports = router