import express from 'express'
import db from "../db.js";

const app = express.Router();

app.get('/:id', async(req, resp) => {
    try {
        let a = await db.infob_mw_filmes.findAll({where: { id_filme: req.params.id }});
        
        a = a.map(item => {
            return {
              idf: item.id_filme,
              nome: item.nm_filme,
              genero: item.ds_genero,
              lancamento: item.ano_lancamento,
              diretor: item.nm_diretor, 
              sinopse: item.ds_sinopse,
              avaliacao: item.ds_avaliacao, 
              descricao: item.ds_descricao, 
              plataforma: item.ds_plataforma, 
              img_maior: item.img_capa_maior, 
              img_menor: item.img_capa_menor
            }
          })
        resp.send(a);
    } catch(e) {
        resp.send({erro: e.toString()})
    }
})

app.get('/boxFilme', async(req, resp) => {
    try {
        let a = await db.infob_mw_filmes.findAll({ limit: 9,
            order: [['nm_filme', 'asc']]});

        a = a.map(item => {
            return {
              id: item.id_filme,
              nome: item.nm_filme,
              genero: item.ds_genero,
              lancamento: item.ano_lancamento,
              diretor: item.nm_diretor, 
              sinopse: item.ds_sinopse,
              avaliacao: item.ds_avaliacao, 
              descricao: item.ds_descricao, 
              plataforma: item.ds_plataforma, 
              img_maior: item.img_capa_maior, 
              img_menor: item.img_capa_menor
            }
          })
        resp.send(a);
    } catch(e) {
        resp.send({erro: e.toString()})
    }
})

app.get('/carrousel', async(req, resp) => {
    try {
        let a = await db.infob_mw_filmes.findAll({ limit: 4,  order: [['nm_filme', 'desc']]});

        a = a.map(item => {
            return {
                img_maior: item.img_capa_maior
            }
          })
        resp.send(a);
    } catch(e) {
        resp.send({erro: e.toString()})
    }
})

app.post('/inserir', async(req, resp) => {
    try {
        let { nome, genero, lancamento, diretor, sinopse, avaliacao, descricao, plataforma, img_maior, img_menor } = req.body;
    
        if(nome == "" && nome.length < 2 || genero == "" || genero <= 3 || lancamento == "" && lancamento.length < 2 || diretor == "" && diretor.length <= 0 || sinopse == "" && sinopse.length <= 0 || avaliacao == "" && avaliacao.length <= 0 || descricao == "" && descricao.length <= 0 || avaliacao.length <= 0 || descricao == "" && descricao.length <= 0 || plataforma == "" && plataforma.length <= 0 || img_menor == "" && img_menor.length <= 0 || img_maior == "" && img_maior.length <= 0) {
            resp.send({erro: '❌ Campos inválidos!'})
        } else {
            let i = await db.infob_mw_filmes.create({
                nm_filme: nome,
                ds_genero: genero,
                ano_lancamento: lancamento,
                nm_diretor: diretor, 
                ds_sinopse: sinopse,
                ds_avaliacao: avaliacao,
                ds_descricao: descricao,
                ds_plataforma: plataforma,
                img_capa_maior: img_maior,
                img_capa_menor: img_menor
            })
            resp.send("Filme inserido!");
        }
    } catch(e) {
        resp.send({erro: e.toString()})
    }
})


app.put('/alterar/:id', async(req, resp) => {
    try {
        let { nome, genero, lancamento, diretor, sinopse, avaliacao, descricao, plataforma, img_maior, img_menor } = req.body;
        let { id } = req.params;

        if(nome == "" && nome.length < 2 || genero == "" || genero <= 3 || lancamento == "" && lancamento.length < 2 || diretor == "" && diretor.length <= 0 || sinopse == "" && sinopse.length <= 0 || avaliacao == "" && avaliacao.length <= 0 || descricao == "" && descricao.length <= 0 || avaliacao.length <= 0 || descricao == "" && descricao.length <= 0 || plataforma == "" && plataforma.length <= 0 || img_menor == "" && img_menor.length <= 0 || img_maior == "" && img_maior.length <= 0) {
            resp.send({erro: '❌ Campos inválidos!'})
        } else {
            let a = await db.infob_mw_filmes.update(
            {
                nm_filme: nome,
                ds_genero: genero,
                ano_lancamento: lancamento,
                nm_diretor: diretor, 
                ds_sinopse: sinopse,
                ds_avaliacao: avaliacao,
                ds_descricao: descricao,
                ds_plataforma: plataforma,
                img_capa_maior: img_maior,
                img_capa_menor: img_menor
            },
            {
                where: {id_filme: id}
            })
            resp.send("Filme alterado!");
        }
    } catch(e) {
        resp.send({ erro: e.toString() })
    }
})


app.delete('/deletar/:id', async(req, resp) => {
    try {
        let { id } = req.params;
        let d = db.infob_mw_filmes.destroy({ where: {id_filme: id}})
        resp.send("Filme removido!");
    } catch(e) {
        resp.send({ erro: e.toString()});
    }
})




export default app