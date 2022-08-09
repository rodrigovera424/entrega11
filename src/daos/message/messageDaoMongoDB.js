const { schema, normalize, denormalize } = require("normalizr");
const { contenedorMongoDB } = require('../../contenedores/index');

class messageDaoMongoDB extends contenedorMongoDB {
    async getAll() {
        let result = await this.model.find({});
        // Definimos un esquema de autores
        const authorSchema = new schema.Entity("author", {}, { idAttribute: 'id' });

        // Definimos un esquema de mensajes
        const messageSchema = new schema.Entity("message", { 
            author: authorSchema
        });        
        const normalizedMessage= normalize(result, [messageSchema]);
        console.log(normalizedMessage);

        const denormalizedMessage = denormalize(
            normalizedMessage.result,
            [messageSchema],
            normalizedMessage.entities
        );
        console.log(denormalizedMessage);

        return normalizedMessage;
    }
}

module.exports = messageDaoMongoDB;