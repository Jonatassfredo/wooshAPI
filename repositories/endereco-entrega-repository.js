require('../models/endereco-entrega-model');
const base = require('../bin/base/repository-base');

class enderecoEntregaRepository {

    constructor() {
        this._base = new base('EnderecoEntrega');
    }

    async create(data) {
        return await this._base.create(data);
    }

    async update(id, data) {
        return await this._base.update(id, data);
    }

    async getAll(_usuarioId) {
        return await this._base._model.find({
            usuarioId: _usuarioId
        });
    }

    async getById(id) {
        return await this._base.getById(id);
    }

    async getByUsuarioId(id) {
        return await this._base._model.find({
            usuarioId: id
        });
    }

    async getByOperadorId(id) {
        return await this._base._model.find({
            operadorId: id
        });
    }

    async getByUsuarioId(id) {
        return await this._base._model.find({
            usuarioId: id
        });
    }

    async delete(id) {
        return await this._base.delete(id);
    }

}

module.exports = enderecoEntregaRepository;