//importação express
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const requireDir = require("require-dir");
//executando aplicação
//executando função chamada pelo import antigo(require)

const app = express();
app.use(express.json());
app.use(cors());

//iniciando db
mongoose.connect(
    "mongodb://localhost:27017/nodeapi",
    { useNewUrlParser: true, useUnifiedTopology: true });

//função que chama diretórios, usada pela dependência require-dir
requireDir("./src/models");

const Product = mongoose.model('Product');

//rotas
app.use('/api', require('./src/routes'))

app.listen(3333, () => {
    console.log('Back-end started! 🍾🍾🍾');
});