'use strict'

const mongoose = require('mongoose');
const schema = mongoose.Schema;

const pedidoModel = new schema({
    usuarioId: {
        type: schema.Types.ObjectId,
        ref: 'Usuario'
    },
    // enderecoEntregaId: {
    //     type: Object,
    //     required: true
    // },
    // enderecoEntregaId: {
    //     type: schema.Types.ObjectId,
    //     ref: 'EnderecoEntrega'
    // },
    enderecoEntrega: {
        type: Object,
        required: true
    },
    operadorId: {
        type: schema.Types.ObjectId,
        ref: 'Operador'
    },
    valorTotal: {
        type: Number,
        required: true,
        default: 0
    },
    itens: {
        type: Object,
        required: true
    },
    dataPedido: {
        type: Date,
        default: Date.now
    },
    dataPedidoAceito: {
        type: Date,
        default: Date.accept //ajustar metodo de pegar data
    },
    status: {
        type: String,
        required: true,
        default: 'Aguardando'
    },
    formaPagamento: {
        type: String
    },
    tempoEntrega: {
        type: Number,
        required: true,
        default: 0
    },
    aceito: {
        type: String,
        required: true,
        default: 'Não'
    },
    usuarioNome: {
        type: String
    }


});

pedidoModel.pre('save', next => {
    let agora = new Date();
    if (!this.dataPedido)
        this.dataPedido = agora;
    next();
});

module.exports = mongoose.model('Pedido', pedidoModel);