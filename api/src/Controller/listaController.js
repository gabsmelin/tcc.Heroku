
import express from 'express'
import db from "../db.js";

const app = express.Router();

app.get('/listar', async(req, resp) => {
    try {
        let l = await db.infob_mw_lista.findAll({ order: [['id_lista', 'desc']] });
        resp.send(l);
    } catch(e) {
        resp.send({ erro: e.toString() })
    }
})

app.post('/lista', async(req, resp) => {
    try {
        let { lista, descricao } = req.body;
        let consulta = await db.infob_mw_lista.findOne({ where: {nm_lista: lista} })
        if(consulta != null){
            resp.send({erro: 'essa lista já existe'})
        } else 
            if (lista == "" || descricao == ""){
                resp.send({ erro: "todos os campos são obrigatórios" })
            } else {
                let l = await db.infob_mw_lista.create({
                    nm_lista: lista,
                    ds_descricao: descricao
                })
                resp.send('lista criada')
            }
    } catch(e) {
        resp.send({ erro: e.toString() })
    }
})

app.put('/lista/:id', async(req, resp) => {
    try {
        let { lista, descricao } = req.body;
        let { id } = req.params;
        let consulta = await db.infob_mw_lista.findOne({ where: {nm_lista: lista} })

        if(consulta != null){
            resp.send({erro: 'essa lista já existe'})
        } else 
            if (lista == "" || descricao == ""){
                resp.send({ erro: "todos os campos são obrigatórios" })
            } else {
                let l = await db.infob_mw_lista.update({
                    nm_lista: lista,
                    ds_descricao: descricao
                },
                {
                    where: {id_lista: id}
                })
                resp.send('lista alterada');
            }
    } catch(e) {
        resp.send({ erro: e.toString() })
    }
})

app.delete('/lista/:id', async(req, resp) => {
    try {
        let { id } = req.params;
        let l = await db.infob_mw_lista.destroy({ where: { id_lista: id }})
        resp.send('lista removida')
    } catch(e) {
        resp.send({erro: e.toString()})
    }
})



export default app