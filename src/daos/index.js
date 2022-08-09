const shoppingCartDaoFirebase = require('./shoppingCart/shoppingCartDaoFirebase');
const shoppingCartDaoMongoDB = require('./shoppingCart/shoppingCartDaoMongoDB');
const productDaoFirebase = require('./product/productDaoFirebase');
const productDaoMongoDB = require('./product/productDaoMongoDB');
const productDaoFaker = require('./product/productDaoFaker');
const messageDaoMongoDB = require('./message/messageDaoMongoDB');

// Models for MongoDB
const shoppingCart = require('../../api/models/shoppingCart');
const product = require('../../api/models/product');
const message = require('../../api/models/message');

// Firebase
const ConnectToDB = require('../../utils/connectToDB');
const queryShoppingCartCollection = ConnectToDB.collection(`shoppingCart`);
const queryProductCollection = ConnectToDB.collection(`product`);


const DATABASES = {
    mongoDB: {
        messageApi: new messageDaoMongoDB('message', message),        
        shoppingCartApi: new shoppingCartDaoMongoDB('shoppingCart', shoppingCart),
        productApi: new productDaoFaker('product',product),
    },
    firebase: {
        shoppingCartApi: new shoppingCartDaoFirebase('shoppingCart', queryShoppingCartCollection),
        productApi: new productDaoFirebase('product',queryProductCollection),
    }
}

const DB = process.env.SELECTED_DB || 'firebase';
console.log(DB);

const { messageApi, shoppingCartApi, productApi } = DATABASES[DB];

module.exports = { messageApi, shoppingCartApi, productApi };
