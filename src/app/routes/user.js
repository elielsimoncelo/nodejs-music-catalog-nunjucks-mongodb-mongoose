#!/usr/bin/env node

const express = require('express');
const router = express.Router();

router.get('/login', (_req, res, _next) => {
    res.render('login');
});

router.get('/logout', (req, res, _next) => {
    req.session.destroy();
    res.redirect('/');
});

router.post('/login', (req, res, _next) => {
    if (req.body.usuario == 'admin' && req.body.senha === '1234') {
        req.session.username = req.body.usuario;
        return res.redirect('/');
    }

    res.render('login', { error : { message: 'Usuário ou senha inválidos.' }});
});


module.exports = router;