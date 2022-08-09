class contenedorMongoDB {
    constructor(nombre, model) {
      this._nombre = nombre;
      this._model = model;
    }

    get nombre() {
        return this._nombre;
    }

    get model() {
        return this._model;
    }    
  
    async save(object) {
        const entity = new this.model(object);
        await entity.save();
        return entity;
    }

    async update(id, object) {
        await this.model.findByIdAndUpdate(id, object);
    }    
  
    async getById(id) {
        let element = await this.model.findById(id);
        return element;
    }
  
    async getAll() {
        let result = await this.model.find({});
        return result;
    }

    async deleteById(id) {
        await this.model.findByIdAndDelete(id);
    }
}

module.exports = contenedorMongoDB;
