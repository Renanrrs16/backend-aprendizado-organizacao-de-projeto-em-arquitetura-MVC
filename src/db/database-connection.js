const { MongoClient } = require('mongodb')

// Preparamos as informacoes ao banco de dados
const dburl = process.env.DATABASE_URL
const dbname = 'mongodb-arquitetura-mvc'

async function connectToDatabase() {
  // Realizamos a conexao com o banco de dados
  const client = new MongoClient(dburl)
  console.log('conectando ao banco de dados...')
  await client.connect()
  console.log('Banco de dados conectado com sucesso!.')

  const db = client.db(dbname)

  //FIXME: usar o db de alguma forma
}

module.exports ={
  connectToDatabase
}