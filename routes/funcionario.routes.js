module.exports = app => {
    const funcionarios = require("../app/controllers/funcionario.controller.js");
    var router = require("express").Router();
    // Create a new Funcionario
    router.post("/", funcionarios.create);
    // Retrieve all funcionarios
    router.get("/", funcionarios.findAll);
    // Retrieve a single Funcionario with id
    router.get("/:id", funcionarios.findOne);
    // Update a Funcionario with id
    router.put("/:id", funcionarios.update);
    // Delete a Funcionario with id
    router.delete("/:id", funcionarios.delete);
    // Create a new Funcionario
    router.delete("/", funcionarios.deleteAll);
    app.use('/api/funcionarios', router);
  };