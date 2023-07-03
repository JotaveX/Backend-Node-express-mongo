const db = require("../../models");
const Funcionario = db.funcionarios;

validaCamposRequeridosFuncionario = (req) => {
    const camposRequeridosEmpty = new Array();
    if (!req.body.nome) {
        camposRequeridosEmpty.push("nome");
    }
    return camposRequeridosEmpty;
}

// Cria e salva um novo documento para a entidade Funcionario
exports.create = (req, res) => {
    // Validate request
    if (!req.body.codigo) {
        res.status(400).send({ message: "Conteúdo não pode ser vazio!" });
        return;
    }

    if(!req.body.ativo) {
        req.body.ativo = false;
    }

    // Validate required fields
    const camposRequeridosEmpty = validaCamposRequeridosFuncionario(req);
    if (camposRequeridosEmpty.length > 0) {
        res.status(400).send({ message: "Campos requeridos ("+camposRequeridosEmpty.join(",") + ") não podem ser vazios!" });
        return;
    }

    // Create a Funcionario
    const funcionario = new Funcionario({
        codigo: req.body.codigo ? req.body.codigo : null,
        nome: req.body.nome ? req.body.nome : null,
        foto: req.body.foto ? req.body.foto : null,
        ativo: req.body.ativo ? req.body.ativo : null,
    });

    // Save Funcionario in the database
    funcionario
        .save(funcionario)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                err.message || "Ocorreu um erro de servidor ao tentar salvar Funcionario."
            });
        });
};

// Procura por todas as entidades do tipo Funcionario
exports.findAll = (req, res) => {
    var condition = {};

    if (req.query.nome) {
        condition.nome = { $regex: new RegExp(req.query.nome), $options: "i" };
    }

    Funcionario.find(condition)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Algum erro desconhecido ocorreu ao buscar Funcionario."
        });
      });
};

// Busca a entidade Funcionario por id
exports.findOne = (req, res) => {

    const id = req.params.id;

    Funcionario.findById(id)
      .then(data => {
        if (!data)
          res.status(404).send({ message: "A entidade Funcionario com id " + id + " não encontrada!" });
        else res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Erro desconhecido ocorreu ao buscar a entidade Funcionario com o id " + id + "."
        });
      });
};

// Altera uma entidade Funcionario
exports.update = (req, res) => {
    // Validate request
    if (!req.body.id) {
        res.status(400).send({ message: "Conteúdo não pode ser vazio!" });
        return;
    }

    // Validate required fields
    const camposRequeridosEmpty = validaCamposRequeridosFuncionario(req);
    if (camposRequeridosEmpty.length > 0) {
        res.status(400).send({ message: "Campos requeridos ("+camposRequeridosEmpty.join(",") + ") não podem ser vazios!" });
        return;
    }

    const id = req.params.id;

    Funcionario.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
      .then(data => {
        if (!data) {
          res.status(404).send({
            message: `A entidade Funcionario com id ${id} não encontrada, por isso não pode ser atualizada!`
          });
        } else res.send({ message: `A entidade Funcionario com id ${id} foi alterada com sucesso.` });
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Erro desconhecido ocorreu ao alterar a entidade Funcionario com o id " + id + "."
        });
      });
};

// Remove a entidade Funcionario por id
exports.delete = (req, res) => {
    const id = req.params.id;

    Funcionario.findByIdAndRemove(id)
      .then(data => {
        if (!data) {
          res.status(404).send({
            message: `A entidade Funcionario com id ${id} não encontrada, por isso não pode ser excluida!`
          });
        } else {
          res.send({
            message: `A entidade Funcionario com id ${id} foi excluída com sucesso.`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Erro desconhecido ocorreu ao excluir a entidade Funcionario com o id " + id + "."
        });
      });
};

// Exclui todos os registros da entidade Funcionario
exports.deleteAll = (req, res) => {

    Funcionario.deleteMany({})
      .then(data => {
        res.send({
          message: `${data.deletedCount} ${data.deletedCount > 1 ? 'Funcionarios' : 'Funcionario'}  foram excluídas!`
        });
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Algum erro desconhecido ocorreu ao excluir todas as entidades Funcionario."
        });
      });
};

// Procura por entidade Funcionario onde o campo booleano ativo seja true
exports.findAllAtivo = (req, res) => {

    Funcionario.find({ ativo: true })
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Algum erro desconhecido ocorreu ao buscar Funcionario por ativo true."
        });
      });
};
