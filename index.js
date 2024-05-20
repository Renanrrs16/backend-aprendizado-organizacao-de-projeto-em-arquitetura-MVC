require('dotenv').config()
const express = require('express')
const { MongoClient, ObjectId } = require('mongodb')

// Preparamos as informacoes ao banco de dados
const dburl = process.env.DATABASE_URL
const dbname = 'mongodb-intro-e-implementacao'

// Declaramos a funcao main()
async function main() {
    // Realizamos a conexao com o banco de dados
    const client = new MongoClient(dburl)
    console.log('conectando ao banco de dados...')
    await client.connect()
    console.log('Banco de dados conectado com sucesso!.')

    const db = client.db(dbname)
    const collection = db.collection('personagem')

    const app = express()

    app.get('/', function (req, res) {
        res.send('Hello World!')
    })

    const lista = ['Java', 'Kotlin', 'Android']
    // idicies       0        1         2

    //Endpoint Read all [GET] /personagem
    app.get('/personagem', async function (req, res) {
        // Acessamos a lista de itens na collection do MongoDB
        const itens = await collection.find().toArray()

        // Enviamos a lista de itens como resultado
        res.send(itens)
    })

    //Endpoint Read By ID [GET] /personagem/:id
    app.get('/personagem/:id', async function (req, res) {
        // Acessamos o parametro de Rota ID
        const id = req.params.id

        // Acessa o item na Collection usando o ID
        const item = await collection.findOne({ _id: new ObjectId(id)})

        // Checamos se o item obtido e existente
        if (!item) {
            return res.status(404).send('Item não encontrado.')
        }

        // Enviamos o item como resposta
        res.send(item)
    })

    //Sinaliza para o Express que estamos usando JSON no Body
    app.use(express.json())

    // Endpoint Create [POST] /personagem
    app.post('/personagem', async function (req, res) {
        // Acessamos o body da Requisição
        const novoitem = req.body

  

        // Checar se o nome esta presente no body
        if (!novoitem || !novoitem.nome) {
            return res.status(400).send('Corpo da requisicao deve conter as propriedade `nome`.')
        }

        // Checa se o novoitem esta na lista ou nao
        // if (lista.includes(novoitem)) {
        //     return res.status(409).send('Item ja existe na lista')
        // }

        // Adicionamos na Colletion
        await collection.insertOne(novoitem)

        // Exibimos a mensagem com sucesso
        res.status(201).send(novoitem)
    })

    // Endpoint Update [PUT] /personagem/:id
    app.put('/personagem/:id', async function (req, res) {
        const id = req.params.id

        // Checamos se o item do ID - 1 esta a lista, exibindo
        // uma mensagem caso nao esteja
        // if (!lista[id - 1]) {
        //     return res.status(404).send('Item não encontrado.')
        // }

        // Acessamos o Body da requisição
        const novoitem = req.body


        // Checar se o nome esta presente no body
        if (!novoitem || !novoitem.nome) {
            return res.status(400).send('Corpo da requisicao deve conter as propriedade `nome`.')
        }

        // Checa se o novoitem esta na lista ou nao
        // if (lista.includes(novoitem)) {
        //     return res.status(409).send('Item ja existe na lista')
        // }

        // Atualizamos na collection o novoitem pelo ID 
        await collection.updateOne(
            { _id: new ObjectId(id) },
            { $set: novoitem}
        )

        // Envia uma mesagem de sucesso
        res.send(novoitem)
    })

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

    app.listen(3000, function () {
        console.log('Aplicação rodando em http://localhost:5000')
    })
}

// Executamos a funcao main()
main()