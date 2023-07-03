var mongoose = require('mongoose');
var Schema = mongoose.Schema;

module.exports = mongoose => {
  var schema = mongoose.Schema(
    {
      codigo: Number,
      nome: String,
      foto:  { data: Buffer, contentType:String, },
      ativo: Boolean
    },
    { timestamps: true }
  );

  schema.method("toJSON", function() {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

  const Funcionario = mongoose.model("funcionario", schema);
  return Funcionario;
};