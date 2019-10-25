require('../models/operador-model');
const base = require('../bin/base/repository-base');
const md5 = require('md5');

class operadorRepository {

    constructor() {
        this._base = new base('Operador');
        this._projection = 'nome';
    }

    async IsNomeExite(Nome) {
        return await this._base._model.findOne({
            nome: Nome
        }, this._projection);
    }
    // async IsCpfExite(Cpf) {
    //     return await this._base._model.findOne({
    //         cpf: Cpf
    //     }, this._projection);
    // }
    async authenticate(Nome, Senha) {
        let _hashSenha = md5(Senha);
        return await this._base._model.findOne({
            nome: Nome,
            senha: _hashSenha
        }, this._projection);
    }

    async create(data) {
        let operadorCriado = await this._base.create(data);
        return this._base._model.findById(operadorCriado._id, this._projection);
    }

    async update(id, data) {
        let operadorAtualizado = await this._base.update(id, {
            nome: data.nome
        });
        return this._base._model.findById(operadorAtualizado._id, this._projection)
    }

    async getAll() {
        return await this._base._model.find({}, this._projection);
    }

    async getById(id) {
        return await this._base._model.findById(id, 'nome _id');
    }

    async delete(id) {
        return await this._base.delete(id);
    }
}

module.exports = operadorRepository;