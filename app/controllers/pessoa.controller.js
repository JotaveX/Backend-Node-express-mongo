const db = require("../../models");
const Pessoa = db.pessoas;
exports.create = (req, res) => {
  // Validate request
  if (!req.body.nome) {
    res.status(400).send({ message: "Conteudo nao pode ser vazio!" });
    return;
  }

  // Create a Pessoa
  const pessoa = new Pessoa({
    nome: req.body.nome ? req.body.nome : null,
    idade: req.body.idade ? req.body.idade : 0,
    celular: req.body.celular ? req.body.celular : null,
  });

  // Save Pessoa in the database
  pessoa
    .save(pessoa)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Algum erro ocorreu com Pessoa.",
      });
    });
};

// Procura por todas as entidades do tipo Pessoa
exports.findAll = (req, res) => {
  var condition = {};

  const nome = req.query.nome;
  if (nome) {
    condition.nome = { $regex: new RegExp(nome), $options: "i" };
  }

  Pessoa.find(condition)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Algum erro desconhecido ocorreu ao buscar Pessoa.",
      });
    });
};

//Procura e retorna apenas 1 de Pessoa pelo Id
exports.findOne = (req, res) => {
  const id = req.params.id;
  Pessoa.findById(id)
    .then((data) => {
      if (!data)
        res.status(404).send({ message: "Id de Pessoa não encontrado: " + id });
      else res.send(data);
    })
    .catch((err) => {
      res.status(500).send({ message: "Ocorreu algum erro com o id=" + id });
    });
};

//Edição de Pessoa
exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!",
    });
  }
  const id = req.params.id;
  Pessoa.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Não é possivel editar Pessoa id=${id}. Pessoa não encontrado!`,
        });
      } else res.send({ message: "Pessoa foi editado com sucesso!" });
    })
    .catch((err) => {
      res.status(500).send({
        message: "Erro no Pessoa com Id:" + id,
      });
    });
};

//Delete Pessoa
exports.delete = (req, res) => {
  const id = req.params.id;
  Pessoa.findByIdAndRemove(id)
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Não é possivel deletar Pessoa id=${id}. Pessoa não encontrado!`,
        });
      } else {
        res.send({
          message: "Pessoa foi deletado com sucesso!",
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Não é possivel deletar Pessoa com o Id: " + id,
      });
    });
};

// Exclui todos os registros da entidade Pessoa
exports.deleteAll = (req, res) => {
  Pessoa.deleteMany({})
    .then((data) => {
      res.send({
        message: `${data.deletedCount} ${
          data.deletedCount > 1 ? "Pessoas" : "Pessoa"
        }  foram excluídas!`,
      });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message ||
          "Algum erro desconhecido ocorreu ao excluir todas as entidades Pessoa.",
      });
    });
};
