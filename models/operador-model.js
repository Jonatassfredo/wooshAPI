'use strict'

const mongoose = require('mongoose');
const schema = mongoose.Schema;

const operadorModel = new schema({
    nome: {
        //está causando erro na execução: index: true,
        type: String,
        required: true,
        trim: true
    },
    senha: {
        type: String,
        required: true
    },
    foto: {
        type: String
    },
    administrador: {
        type: String
    },
    ativo: {
        type: Boolean,
        required: true,
        default: true
    },
    dataCriacao: {
        type: Date,
        default: Date.now
    }
});

operadorModel.pre('save', next => {
    let agora = new Date();
    if (!this.dataCriacao)
        this.dataCriacao = agora;
    next();
});

module.exports = mongoose.model('Operador', operadorModel);