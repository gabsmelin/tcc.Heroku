import express from 'express'
import db from "../db.js";
import crypto from 'crypto-js'

const app = express.Router();

app.get('/listar', async(req, resp) => {
    try {
        let a = await db.infob_mw_usuario.findAll();
        resp.send(a);
    } catch(e) {
        resp.send({erro: e.toString()})
    }
})

app.post('/cadastrar', async(req, resp) => {
    try {
        let { nome, sobrenome, username, email, senha, nascimento, genero} = req.body;
        
        let e = await db.infob_mw_usuario.findOne({where: {ds_email: email}})
        if(e != null) 
            resp.send({erro: '❌ Usuário já existe!'})

        {/*if(e == username) 
        resp.send({erro: '❌ Nome de usuário já existente!'})
        , nm_username: username*/}

        if(nome == "" && nome.length < 2 || sobrenome == "" || sobrenome <= 3 || username == "" && username.length < 2 || email == "" && email.length <= 0 || senha == "" && senha.length <= 0 || genero == "" && genero.length <= 0 || nascimento == "" && nascimento.length <= 0) 
            resp.send({erro: '❌ Campos inválidos!'})


        let i = await db.infob_mw_usuario.create({
            nm_usuario: nome,
            nm_sobrenome: sobrenome,
            nm_username: username,
            ds_email: email,
            ds_senha: crypto.SHA256(senha).toString(crypto.enc.Base64),
            ds_genero: genero,
            ds_nascimento: nascimento,
        })
        resp.send("Usuário inserido!");
    } catch(e) {
        resp.send({erro: e.toString()})
    }
})


app.put('/alterar/:id', async(req, resp) => {
    try {
        let { nome, sobrenome, username, email, senha, genero, nascimento, localizacao, redes, fotoperfil } = req.body;
        let { id } = req.params;

        let a = await db.infob_mw_usuario.update({
            nm_usuario: nome,
            nm_sobrenome: sobrenome,
            nm_username: username,
            ds_email: email,
            ds_senha: senha,
            ds_genero: genero,
            ds_nascimento: nascimento,
            ds_localizacao: localizacao,
            ds_redes_sociais: redes,
            ds_foto: fotoperfil
        },
        {
            where: {id_usuario: id}
        })
        resp.send("Usuário alterado!");
    } catch(e) {
        resp.send({erro: e.toString()})
    }
})


app.delete('/deletar/:id', async(req, resp) => {
    try {
        let { id } = req.params;
        let d = db.infob_mw_usuario.destroy({ where: {id_usuario: id}})
        resp.send("Usuario removido!");
    } catch(e) {
        resp.send({ erro: e.toString()});
    }
})

export default app