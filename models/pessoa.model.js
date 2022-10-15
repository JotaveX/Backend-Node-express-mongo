module.exports = mongoose => {
  var schema = mongoose.Schema(
    {
      nome: String,
      idade: Number,
      celular: String
    },
    { timestamps: true }
  );

  schema.method("toJSON", function() {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

  const Pessoa = mongoose.model("pessoa", schema);
  return Pessoa;
};
