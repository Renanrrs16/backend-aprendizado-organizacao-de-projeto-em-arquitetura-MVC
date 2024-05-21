require('dotenv').config()
const express = require('express')
const { connectToDatabase } = require('./db/database-connection')
const personagemRouter = require('./personagem/personagem.router')
//const { MongoClient, ObjectId } = require('mongodb')



// Declaramos a funcao main()
async function main() {
// FIX: Utilizar o connectToDatabase() e receber o DB
    await connectToDatabase()

    //const collection = db.collection('personagem')

    const app = express()

    //Middlewares
    //Sinaliza para o Express que estamos usando JSON no Body
    app.use(express.json())

    app.get('/', function (req, res) {
        res.send('Hello World!')
    })

    app.use('/personagem', personagemRouter)

    //FIX: mover isso para a pasta 'personagem'
    /*
    // Endpoint Delete [DELETE] /personagem/:id
    app.delete('/personagem/:id', async function (req, res) {

        // Acessamos o parametro de rota
        const id = req.params.id

        // Checamos se o item do ID - 1 esta a lista, exibindo
        // uma mensagem caso nao esteja
        // if (!lista[id - 1]) {
        //     return res.status(404).send('Item não encontrado.')
        // }

        // Remover o item da Collection usando ID
        await collection.deleteOne({_id: new ObjectId(id) })

        // Enviamos uma mensagem de sucesso
        res.send('Item deletado com sucesso: ' + id)
    })
    */
    app.listen(3000, function () {
        console.log('Aplicação rodando em http://localhost:3000')
    })
}

// Executamos a funcao main()
main()