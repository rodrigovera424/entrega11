class contenedorFirebase {
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
        let response = await this.query.get();
        return response.docs.map(doc => doc.data());
    }

    async deleteById(id) {
        await this.query.doc(id).delete();        
    }
}

module.exports = contenedorFirebase;

