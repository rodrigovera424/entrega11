const express = require('express');
const shoppingCartRoutes = express.Router();

const { shoppingCartApi } = require('../../src/daos/index');

shoppingCartRoutes.post('/', async (req, res) => {
    let object = req.body;
    let id = await shoppingCartApi.save(object);
    res.send(id.toString());
});

shoppingCartRoutes.delete('/:id', async (req, res) => {
    let id = req.params.id;
    await shoppingCartApi.deleteById(id);
    res.send(id);
});

shoppingCartRoutes.get('/:id/productos', async (req, res) => {
    let id = req.params.id;
    let shoppingCart = await shoppingCartApi.getById(id);
    if (shoppingCart == null) {
        shoppingCart = { error: 'carrito no encontrado'};
    }
    res.send(shoppingCart);
});

shoppingCartRoutes.post('/:id/productos/:id_prod', async (req, res) => {
    let id = req.params.id;
    let id_prod = req.params.id_prod;
    let shoppingCart = await shoppingCartApi.getById(id);
    let product = await productApi.getById(id_prod);
    if (shoppingCart.products === undefined) {
        shoppingCart.products = [];
    }
    shoppingCart.products.push(product);
    console.log(shoppingCart);
    await shoppingCartApi.update(shoppingCart);
    res.send(id.toString());
});

shoppingCartRoutes.delete('/:id/productos/:id_prod', async (req, res) => {
    let id = req.params.id;
    let id_prod = req.params.id_prod;
    let shoppingCart = await contenedorMongoShoppingCart.getById(id);
    let products = shoppingCart.products.filter(element => element.id !== parseInt(id_prod));
    shoppingCart.products = products;
    console.log(shoppingCart);
    await contenedorMongoShoppingCart.update(shoppingCart);
    res.send(id.toString());
});

shoppingCartRoutes.use(function(req, res, next) {
    if (!req.route) {
        let message = { error : -2, descripcion: `ruta ${req.baseUrl} método ${req._parsedUrl.pathname} no implementada` }
        res.send(message);
    }
    next();
});

module.exports = shoppingCartRoutes;