

import express from 'express'
import db from "../db.js";

const app = express.Router();

import Sequelize from 'sequelize';
const { Op } = Sequelize;

app.get('/listaru', async(req, resp) => {
    try {
        let id = req.params;

        let coment = await db.infob_mw_comentarios.findAll({
            where: {
                'id_usuario': id
            },
            include: [{
                model: db.infob_mw_usuario,
                as: 'infob_mw_usuario',
                required: true
            }],
            order: [
                ['ds_curtidas', 'desc']
            ]
        })

        resp.send(coment)
    } catch(e) {
        resp.send({e:erro.toString()})
    }
})






















app.get('/listar', async(req, resp) => {
    try {
        let c = await db.infob_mw_comentarios.findAll();

        c = c.map(item => {
            return {
              id: item.id_cometario,
              id_filme: item.id_filme,
              id_usuario: item.id_usuario,
              mensagem: item.ds_mensagem,
              data: item.dt_comentario,
              curtidas: item.ds_curtidas
            }
          })
        resp.send(c);
    } catch(e) {
        resp.send({ erro: e.toString() })
    }
})


app.post('/inserir', async(req, resp) => {
    try {
        let { id_filme, id_usuario, mensagem, curtidas } = req.body;
        
        let i = await db.infob_mw_comentarios.create({
            id_filme: id_filme,
            id_usuario: id_usuario,
            ds_mensagem: mensagem,
            dt_comentario: new Date,
            ds_curtidas: curtidas
        })
        resp.send("Comentario inserido!");
    } catch(e) {
        resp.send({erro: e.toString()})
    }
})


app.put('/alterar/:id', async(req, resp) => {
    try {
        let { filme, usuario, mensagem, curtidas } = req.body;
        let { id } = req.params;

        let a = await db.infob_mw_comentarios.update({
            id_filme: filme,
            id_usuario: usuario,
            mensagem: mensagem,
            curtidas: curtidas
        },
        {
            where: {id_cometario: id}
        })
        resp.send("Comentario alterado!");
    } catch(e) {
        resp.send({erro: e.toString()})
    }
})


app.delete('/deletar/:id', async(req, resp) => {
    try {
        let { id } = req.params;
        let c = db.infob_mw_comentarios.destroy({ where: {id_cometario: id}})
        resp.send("Comentario removido!");
    } catch(e) {
        resp.send({ erro: e.toString()});
    }
})

export default app