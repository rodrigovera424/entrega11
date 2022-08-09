const express = require('express');
const productRoutes = express.Router();

const { productApi } = require('../../src/daos/index');

productRoutes.get('/', async (req, res) => {
    let list = await productApi.getAll();
    res.send(list);
});

productRoutes.get('/:id', async (req, res) => {
    let id = req.params.id;
    let product = await productApi.getById(id);
    if (product == null) {
        product = { error: 'producto no encontrado'};
    }
    res.send(product);
});

productRoutes.post('/', async (req, res) => {
    let product = req.body;
    let id = await productApi.save(product);
    res.send(id.toString());
});

productRoutes.put('/:id', async (req, res) => {
    let product = req.body;
    await productApi.update(product);
    res.send();
});

productRoutes.delete('/:id', async (req, res) => {
    let id = req.params.id;
    await productApi.deleteById(id);
    res.send(id);
});

productRoutes.use(function(req, res, next) {
    if (!req.route) {
        let message = { error : -2, descripcion: `ruta ${req.baseUrl} método ${req._parsedUrl.pathname} no implementada` }
        res.send(message);
    }
});

module.exports = productRoutes;