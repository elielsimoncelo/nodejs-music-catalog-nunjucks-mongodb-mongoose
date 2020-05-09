#!/usr/bin/env node

const express = require('express');
const router = express.Router();
const Musicas = () => require('../models/musica');
const { connectionTest } = require('../db/database');

router.get('/status/check', (_req, res, next) => {
    connectionTest().then(status => {
        const [ statusCode, statusMessage ] = status ? [ 200, 'OK' ] : [ 400, 'ERROR' ]; 
        res.status(statusCode).send('Database status: ' + statusMessage);
    }, next);
});

router.get('/', (req, res, next) => {
    Musicas().find().then((musicas) => {
        res.render('index', { musicas: musicas, username: req.session.username });
    }, next);
});

router.get('/add', (_req, res, _next) => {
    res.render('add');
});

router.post('/', (req, res, next) => {    
    Musicas().create(req.body).then((musica) => {
        if (!musica) {
            return res.send(400);
        }

        res.redirect('/');
    }, next);
});

router.get('/edit/:id', (req, res, next) => {
    const {id} = req.params;
    
    Musicas().findById(id).then((musica) => {
        if (!musica) {
            return res.send(404);
        }

        res.render('edit', {
            musica: musica
        });
    }, next);
});

router.put('/edit/:id', (req, res, next) => {
    const {id} = req.params;
    
    Musicas().updateOne({ _id: id }, {
        $set: {
            nome: req.body.nome,
            artista: req.body.artista,
            estrelas: req.body.estrelas
        }
    }).then((result) => {
        if (!result.ok) {
            return res.send(400);
        }
        
        res.redirect('/');
    }, next);
});

router.delete('/delete/:id', (req, res, next) => {
    const {id} = req.params;

    Musicas().deleteOne({ _id: id }).then((result) => {
        if (!result.ok) {
            return res.send(400);
        }

        res.redirect('/');
    }, next);
});

module.exports = router;