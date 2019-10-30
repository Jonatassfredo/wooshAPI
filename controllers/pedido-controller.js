'use strict'

const repository = require('../repositories/pedido-repository');
const ctrlBase = require('../bin/base/controller-base');
const validation = require('../bin/helpers/validation');
const _repo = new repository();

function pedidoController() {

}

pedidoController.prototype.post = async (req, res) => {

    let _validationContract = new validation();
    _validationContract.isRequired(req.body.valorTotal, 'Você não possui itens no carrinho');
    _validationContract.isRequired(req.body.itens, 'Informe os itens do seu pedido');
    _validationContract.isRequired(req.body.enderecoEntregaId, 'Informe o Endereço de Entrega do seu pedido');

    //pega o id do usuário e joga no pedido
    req.body.usuarioId = req.usuarioLogado.user._id;
    //pega o id do operador e joga no pedido
    // req.body.operadorId = req.operadorLogado.user._id;

    ctrlBase.post(_repo, _validationContract, req, res);
};

pedidoController.prototype.get = async (req, res) => {
    let result = await _repo.getAll(req.usuarioLogado.user._id);
    res.status(200).send(result);
};

pedidoController.prototype.getAll = async (req, res) => {
    let result = await _repo.getAllPedidos(req, res);
    res.status(200).send(result);

    // ctrlBase.get(_repo, req, res);
};

pedidoController.prototype.getById = async (req, res) => {
    ctrlBase.getById(_repo, req, res);
};

pedidoController.prototype.delete = async (req, res) => {
    ctrlBase.delete(_repo, req, res);
};

pedidoController.prototype.put = async (req, res) => {

    let _validationContract = new validation();
    _validationContract.isRequired(req.body.valorTotal, 'O valor Total é obrigatório');
    _validationContract.isRequired(req.body.itens, 'Informe os itens do seu pedido');

    ctrlBase.put(_repo, _validationContract, req, res);
};



module.exports = pedidoController;