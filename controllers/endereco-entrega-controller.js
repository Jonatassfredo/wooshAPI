'use strict'

const repository = require('../repositories/endereco-entrega-repository');
const ctrlBase = require('../bin/base/controller-base');
const validation = require('../bin/helpers/validation');
const _repo = new repository();

function enderecoEntregaController() {

}

enderecoEntregaController.prototype.post = async(req, res) => {
    let _validationContract = new validation();
    _validationContract.isRequired(req.body.bairro, 'O Bairro é obrigatorio');
    _validationContract.isRequired(req.body.rua, 'A Rua é obrigatoria');
    _validationContract.isRequired(req.body.uf, 'A UF é obrigatoria');
    _validationContract.isRequired(req.body.cep, 'O CEP é obrigatorio');
    _validationContract.isRequired(req.body.cidade, 'A Cidade é obrigatoria');
    _validationContract.isRequired(req.body.numero, 'O numero é obrigatorio');

    //pega o id do usuário e joga no pedido
    req.body.usuarioId = req.usuarioLogado.user._id;

    ctrlBase.post(_repo, _validationContract, req, res);
};

enderecoEntregaController.prototype.put = async(req, res) => {
    let _validationContract = new validation();
    _validationContract.isRequired(req.body.bairro, 'O Bairro é obrigatorio');
    _validationContract.isRequired(req.body.rua, 'A Rua é obrigatoria');
    _validationContract.isRequired(req.body.uf, 'A UF é obrigatoria');
    _validationContract.isRequired(req.body.cep, 'O CEP é obrigatorio');
    _validationContract.isRequired(req.body.cidade, 'A Cidade é obrigatoria');
    _validationContract.isRequired(req.body.numero, 'O numero é obrigatorio');

    //pega o id do usuário e joga no pedido
    req.body.usuarioId = req.usuarioLogado.user._id;

    ctrlBase.put(_repo, _validationContract, req, res);
};

enderecoEntregaController.prototype.get = async(req, res) => {
    let result = await _repo.getAll(req.usuarioLogado.user._id);
    res.status(200).send(result);
};

enderecoEntregaController.prototype.getById = async(req, res) => {
    ctrlBase.getById(_repo, req, res);
};

enderecoEntregaController.prototype.getByOperadorId = async(req, res) => {
    try {
        let id = req.params.id;
        if (id) {
            let data = await _repo.getByOperadorId(req.params.id);
            res.status(200).send(data);
        } else {
            res.status(400).send({
                message: 'Informe o id do Operador',
                validation: {}
            })
        }
    } catch (error) {
        console.log('get com error, motivo: ', err);
        res.status(500).send({
            message: 'Erro no processamento',
            error: err
        });
    }
};

enderecoEntregaController.prototype.getByUsuarioId = async(req, res) => {
    try {
        let id = req.params.id;
        if (id) {
            let data = await _repo.getByUsuarioId(req.params.id);
            res.status(200).send(data);
        } else {
            res.status(400).send({
                message: 'Informe o id do usuário',
                validation: {}
            })
        }
    } catch (error) {
        console.log('get com error, motivo: ', err);
        res.status(500).send({
            message: 'Erro no processamento',
            error: err
        });
    }
};

enderecoEntregaController.prototype.delete = async(req, res) => {
    ctrlBase.delete(_repo, req, res);
};

module.exports = enderecoEntregaController;