'use strict'

const mongoose = require('mongoose');
const schema = mongoose.Schema;

const enderecoEntregaModel = new schema({
    usuarioId: {
        type: schema.Types.ObjectId,
        ref: 'Usuario'
    },
    bairro: {
        type: String
    },
    rua: {
        type: String
    },
    numero: {
        type: String
    },
    pontoReferencia: {
        type: String
    },
    orientacoes: {
        type: String
    },
    cidade: {
        type: String
    },
    uf: {
        type: String
    },
    cep: {
        type: Number
    }
});

module.exports = mongoose.model('EnderecoEntrega', enderecoEntregaModel);