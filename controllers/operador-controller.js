'use strict'

const repository = require('../repositories/operador-repository');
const validation = require('../bin/helpers/validation');
const ctrlBase = require('../bin/base/controller-base');
const _repo = new repository();

//Dependência para a geração do Token
const jwt = require('jsonwebtoken');
const variables = require('../bin/configuration/variables');
const md5 = require('md5');

function operadorController() {

}

operadorController.prototype.post = async(req, res) => {
    let _validationContract = new validation();
    _validationContract.isRequired(req.body.nome, 'Informe um nome');
    _validationContract.isRequired(req.body.senha, 'A senha informada é obrigatória');
    _validationContract.isRequired(req.body.senhaConfirmacao, 'A senha de confirmação é obrigatória');
    _validationContract.isTrue(req.body.senha != req.body.senhaConfirmacao, 'As senhas não são iguais');
    //Criptografa a senha do usuário
    if (req.body.senha)
        req.body.senha = md5(req.body.senha);
    if (req.body.senhaConfirmacao)
        req.body.senhaConfirmacao = md5(req.body.senhaConfirmacao);
    ctrlBase.post(_repo, _validationContract, req, res);
};

operadorController.prototype.put = async(req, res) => {
    let _validationContract = new validation();
    _validationContract.isRequired(req.body.nome, 'Informe seu nome');
    _validationContract.isRequired(req.params.id, 'Informe oId do operador que será editado');
    ctrlBase.put(_repo, _validationContract, req, res);
};

operadorController.prototype.get = async(req, res) => {
    ctrlBase.get(_repo, req, res);
};

operadorController.prototype.getById = async(req, res) => {
    ctrlBase.getById(_repo, req, res);
};

operadorController.prototype.delete = async(req, res) => {
    ctrlBase.delete(_repo, req, res);
};

operadorController.prototype.autenticar = async(req, res) => {
    let _validationContract = new validation();
    _validationContract.isRequired(req.body.senha, 'Informe sua senha');
    if (!_validationContract.isValid()) {
        res.status(400).send({
            message: 'Não foi possível efetuar o login',
            validation: _validationContract.errors()
        })
        return;
    }
    let operadorEncontrado = await _repo.authenticate(req.body.nome, req.body.senha);
    if (operadorEncontrado) {
        res.status(200).send({
            operador: operadorEncontrado,
            token: jwt.sign({
                user: operadorEncontrado
            }, variables.Security.secretyKey)
        })
    } else {
        res.status(404).send({
            message: 'Operador e senha informados são inválidos!'
        });
    }
}

module.exports = operadorController;