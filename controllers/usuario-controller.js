'use strict'

const repository = require('../repositories/usuario-repository');
const validation = require('../bin/helpers/validation');
const ctrlBase = require('../bin/base/controller-base');
const _repo = new repository();

//Dependência para a geração do Token
const jwt = require('jsonwebtoken');
const variables = require('../bin/configuration/variables');
const md5 = require('md5');

function usuarioController() {

}

usuarioController.prototype.post = async(req, res) => {

    let _validationContract = new validation();
    _validationContract.isRequired(req.body.nome, 'Informe seu nome');
    _validationContract.isRequired(req.body.cpf, 'Informe seu CPF');
    _validationContract.isCpf(req.body.cpf, 'O CPF informado é inválido');
    _validationContract.isRequired(req.body.email, 'Informe seu e-mail');
    _validationContract.isEmail(req.body.email, 'O e-mail informado é inválido');
    _validationContract.isRequired(req.body.senha, 'A senha informada é obrigatória');
    _validationContract.isRequired(req.body.senhaConfirmacao, 'A senha de confirmação é obrigatória');
    _validationContract.isTrue(req.body.senha != req.body.senhaConfirmacao, 'A Senha e a Confirmação não são iguais');
    if (req.body.email) {
        let usuarioIsEmailExiste = await _repo.IsEmailExite(req.body.email);
        if (usuarioIsEmailExiste) {
            _validationContract.isTrue((usuarioIsEmailExiste.nome != undefined), `O e-mail ${req.body.email} já existe em nosso Banco de Dados.`);
        }
    }
    if (req.body.cpf) {
        let usuarioIsCpfExiste = await _repo.IsCpfExite(req.body.cpf);
        if (usuarioIsCpfExiste) {
            _validationContract.isTrue((usuarioIsCpfExiste.nome != undefined), `O CPF ${req.body.cpf} já exisate em nosso Banco de Dados.`);
        }
    }
    //Criptografa a senha do usuário
    if (req.body.senha)
        req.body.senha = md5(req.body.senha);
    if (req.body.senhaConfirmacao)
        req.body.senhaConfirmacao = md5(req.body.senhaConfirmacao);
    ctrlBase.post(_repo, _validationContract, req, res);
};

usuarioController.prototype.put = async(req, res) => {
    let _validationContract = new validation();
    _validationContract.isRequired(req.body.nome, 'Informe seu nome');
    _validationContract.isRequired(req.body.email, 'Informe seu e-mail');
    _validationContract.isEmail(req.body.email, 'O e-mail informado é inválido');
    _validationContract.isRequired(req.params.id, 'Informe oId do usuário que será editado');
    let usuarioIsEmailExiste = await _repo.IsEmailExite(req.body.email);
    if (usuarioIsEmailExiste) {
        _validationContract.isTrue(
            (usuarioIsEmailExiste.nome != undefined) &&
            (usuarioIsEmailExiste._id != req.params.id),
            `Já existe o e-mail ${req.body.email} cadastrado em nossa base.`);
    }
    ctrlBase.put(_repo, _validationContract, req, res);
};

usuarioController.prototype.get = async(req, res) => {
    ctrlBase.get(_repo, req, res);
};

usuarioController.prototype.getById = async(req, res) => {
    ctrlBase.getById(_repo, req, res);
};

usuarioController.prototype.delete = async(req, res) => {
    ctrlBase.delete(_repo, req, res);
};

usuarioController.prototype.autenticar = async(req, res) => {
    let _validationContract = new validation();
    _validationContract.isRequired(req.body.email, 'Informe um e-mail');
    _validationContract.isEmail(req.body.email, 'O E-mail informado é inválido');
    _validationContract.isRequired(req.body.senha, 'Informe uma senha');

    if (!_validationContract.isValid()) {
        res.status(400).send({
            message: 'Não foi possível efetuar o login',
            validation: _validationContract.errors()
        })
        return;
    }
    let usuarioEncontrado = await _repo.authenticate(req.body.email, req.body.senha);
    if (usuarioEncontrado) {
        res.status(200).send({
            usuario: usuarioEncontrado,
            token: jwt.sign({
                user: usuarioEncontrado
            }, variables.Security.secretyKey)
        })
    } else {
        res.status(404).send({
            message: 'Usuário e senha informados são inválidos!'
        });
    }
}

module.exports = usuarioController;