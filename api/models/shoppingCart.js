var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ShoppingCartSchema = new Schema({
	timestamp: String,
	products: [{
		nombre: String,
		descripcion: String,
		codigo: String,
		foto: String,
		precio: Number,
		stock: Number,
		timestamp: String,
	}],
});

module.exports = mongoose.model('ShoppingCart', ShoppingCartSchema);