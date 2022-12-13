const {
  MongoClient,
  ObjectId,
} = require("mongodb"); /*carregamento do modulo mongodb e objectId(para converter o id que vai vir como uma string), vamos usar o obj mongoclient*/
async function connect() {
  if (global.db)
    return global.db; /*Verificacao se existe uma variavel global.db, se existir ele ja finaliza*/
  const conn = await MongoClient.connect(
    "mongodb://0.0.0.0:27017/"
  ); /*agora se for a primeira conexão sera chamada a funcao mongoclient.connect passando a connection string*/
  if (!conn) return new Error("Can't connect");
  global.db = await conn.db("workshop");
  return global.db;
}

/*Funcao para realizar conexao com o BD e conectando a colecao customers para fazer um find sem filtro, usei toArray para converter o cursor e retornar o mesmo */
async function findAll() {
  const db = await connect();
  return db.collection("customers").find().toArray();
}

/*Funcao para inserir clientes usando a conexao global e exe um callback ao seu termino*/
async function insert(customer) {
  const db = await connect();
  return db.collection("customers").insertOne(customer);
}

/*Funcao que retorna apenas um cliente baseado no seu id*/
async function findOne(id) {
  const db = await connect();
  const objId = new ObjectId(id);
  return db.collection("customers").findOne(objId);
}

/**Funcao para fazer Update no cliente*/
async function update(id, customer) {
  const filter = { _id: new ObjectId(id) };
  const db = await connect();
  return db.collection("customers").updateOne(filter, { $set: customer });
}

/* Funcao para deletar */
async function deleteOne(id) {
  const db = await connect();
  const filter = { _id: new ObjectId(id) };
  return db.collection("customers").deleteOne(filter);
}

module.exports = { findAll, insert, findOne, update, deleteOne };
