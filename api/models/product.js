var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ProductSchema = new Schema({
	nombre: String,
	descripcion: String,
    codigo: String,
	foto: String,
	precio: Number,
    stock: Number,
    timestamp: String,
});

module.exports = mongoose.model('Product', ProductSchema);
