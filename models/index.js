const mongoose = require("mongoose");
mongoose.Promise = global.Promise;
const db = {};
db.mongoose = mongoose;

//Declara Pessoa
db.pessoas = require("./pessoa.model.js")(mongoose);

