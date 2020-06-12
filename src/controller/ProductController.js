const mongoose = require('mongoose');
const { response } = require('express');
const Product = mongoose.model('Product');

module.exports = {
    async index(req, res) {
        //page = 1 valor padrão caso não encontre a rota
        const { page = 1 } = req.query;
        //usando shorte sintaxe no page( page:page )
        const products = await Product.paginate({}, { page, limit: 10 });
        //usar await sempre que tiver a função assíncrona, a próxima linha vai esperar a resposta para assim pode executar
        return res.json(products);
    },

    async show(req, res) {
        //req.params.id pega o parametro id da rota
        const product = await Product.findById(req.params.id);
        return res.json(product);
    },

    async store(req, res) {
        const product = await Product.create(req.body);
        return res.json(product);
    },
    async update(req, res) {
        //new:true garante que o product retorne depois de pegar req.body (resposta.body)
        const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
        return res.json(product);
    },
    async destroy(req, res) {
        await Product.findByIdAndRemove(req.params.id);
        return res.send();
    }
};