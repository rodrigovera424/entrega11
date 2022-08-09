var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var MessageSchema = new Schema({
    author: {
        id: String,
        firstName: String,
        lastName: String,
        age: String,
        nickName: String,
        avatar: String,    
    },
    date: String,
    text: String 
});

module.exports = mongoose.model('Message', MessageSchema);
