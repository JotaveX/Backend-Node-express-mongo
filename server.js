const express = require("express");
const cors = require("cors"); 
const app = express();

var corsOptions = { 
  origin: "http://localhost:4200" 
}; 

app.use(cors(corsOptions));
// parse requests of content-type - application/json
app.use(express.json());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));
const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://jvpiloni:2QeVI8UswTGPYXZx@cluster0.cgvp8s3.mongodb.net/?retryWrites=true&w=majority');


// simple route
app.get("/", (req, res) => { 
  res.json({ message: "Welcome to application." }); 
}); 

//Declara Pessoa rotas
require("./routes/pessoa.routes")(app); 

//Declara Funcionario rotas
require("./routes/funcionario.routes")(app);

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
console.log(`Server is running on port ${PORT}.`);
});
