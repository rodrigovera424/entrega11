const n = 5;
const { faker } = require("@faker-js/faker");

class contenedorFaker {
    constructor(nombre, query) {
      this._nombre = nombre;
      this._query = query;      
    }

    get nombre() {
        return this._nombre;
    }

    get query() {
        return this._query;
    }    
  
    async save(object) {
        const entity = await this.query.doc().set(object);
        return entity;
    }

    async update(id, object) {
        await this.query.doc(id).update(object);
    }    
  
    async getById(id) {
        const response = this.query.doc(id);
        const element = await response.get();
        return element.data();
    }
  
    async getAll() {
        let arr = [];
        for (let i = 0; i < n; i++) {
            let object = {
                nombre: faker.commerce.product(),
                precio: faker.commerce.price(1, 1000),
                foto: faker.image.abstract()
            }
            arr.push(object);
        }
        return arr;
    }

    async deleteById(id) {
        await this.query.doc(id).delete();        
    }
}

module.exports = contenedorFaker;

