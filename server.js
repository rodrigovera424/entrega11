require('dotenv').config();
const express = require('express');
const { Server: HttpServer } = require("http");
const { Server: IOServer } = require("socket.io");

const administrador = true;
const exphbs  = require('express-handlebars');
const productRoutes = require('./api/routes/product');
const shoppingCartRoutes = require('./api/routes/shoppingCart');

const mongoose = require('mongoose');
let db = 'mongodb://localhost:27017/ecommerce';
mongoose.connect(db);

const app = express();
const httpServer = new HttpServer(app);
const io = new IOServer(httpServer);

const { messageApi, productApi } = require('./src/daos/index');

function errorHandler(err, req, res, next) {
    console.error(err);
    res.status(500).send(err.stack);
}

function authChecker(req, res, next) {
    if (administrador) {
        next();
    } else {
        let message = { error : -1, descripcion: `ruta ${req.baseUrl} método ${req._parsedUrl.pathname} no autorizada` }
        res.send(message);
    }
}

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(authChecker);
app.use("/api/productos-test", productRoutes);
app.use("/api/carrito", shoppingCartRoutes);
app.use("/static", express.static(__dirname + "/public"));

app.use(errorHandler);

app.engine('handlebars', exphbs.engine({ 
    layoutsDir: `${__dirname}/views/layouts`
}))

app.set('view engine', 'handlebars');
app.set('views', './views');

app.get('/', async function(req,res) {
    res.render('create', { layout: 'index' });
});

const port = 8080;
httpServer.listen(port, () => {
    console.log(`Servidor http escuchando en el puerto ${port}`);
});

io.on("connection", async (socket) => {
    console.log("Un cliente se ha conectado");

    // Emit Product List
    let productList = await productApi.getAll();
    socket.emit("product-list", productList);    

    // Emit Message List
    let messageList = await messageApi.getAll();
    socket.emit("message-list", messageList);

    socket.on("new-product", async (data) => {
        productList.push(data);
        await productApi.save(data);
        io.sockets.emit("product-list", productList);
    });    

    socket.on("new-message", async (data) => {
      messageList.push(data);
      await messageApi.save(data);
      io.sockets.emit("message-list", messageList);
    });
});
