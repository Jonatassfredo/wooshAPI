'use strict'

const express = require('express');
const router = express.Router();
const controller = require('../controllers/endereco-entrega-controller');
const auth = require('../middlewares/authenctication');

let _ctrl = new controller();

router.get('/', auth, _ctrl.get);
router.get('/:id', auth, _ctrl.getById);
router.get('/operador/:id', auth, _ctrl.getByOperadorId);
router.get('/usuario/:id', auth, _ctrl.getByUsuarioId);
router.post('/', auth, _ctrl.post);
router.put('/:id', auth, _ctrl.put);
router.delete('/:id', auth, _ctrl.delete);

module.exports = router;