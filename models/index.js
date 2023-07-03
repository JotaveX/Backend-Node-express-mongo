const mongoose = require("mongoose");
mongoose.Promise = global.Promise;
const db = {};
db.mongoose = mongoose;

//Declara Pessoa
db.pessoas = require("./pessoa.model.js")(mongoose);

//Declara Funcionario
db.funcionarios = require("./funcionario.model.js")(mongoose);

module.exports = db;
