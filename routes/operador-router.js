'use strict'

const express = require('express');
const router = express.Router();
const controller = require('../controllers/operador-controller');
const auth = require('../middlewares/authenctication');

let _ctrl = new controller();

//Public access
router.post('/autenticar', _ctrl.autenticar);

//Token auth required
router.get('/', auth, _ctrl.get);
router.get('/:id', auth, _ctrl.getById);
router.post('/', auth, _ctrl.post);
router.put('/:id', auth, _ctrl.put);
router.delete('/:id', auth, _ctrl.delete);

module.exports = router;