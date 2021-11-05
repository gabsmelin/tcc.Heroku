import express from 'express'
import db from "../db.js";
import crypto from 'crypto-js'
import enviarEmail  from "../enviarEmail.js"; 


const app = express.Router();

app.post('/login', async (req, resp) => {
    const senha = req.body.senha;
    const cryptoSenha =  crypto.SHA256(senha).toString(crypto.enc.Base64);
    const usuario = await db.infob_mw_usuario.findOne({
        where: {
           ds_email: req.body.email,
           ds_senha: cryptoSenha
        }
    })
        if (!usuario) {
            resp.send({ status: 'erro', mensagem: 'Credenciais inválidas.'});
        } else {
            resp.send({ status: 'ok', nome: usuario.nm_usuario});
        }
    
    })
    


  function getRandomInteger(min, max) {
    return Math.floor(Math.random() * (max - min) ) + min;
  }


  
  app.post('/esqueci', async (req, resp) => {
    const usuario = await db.infob_mw_usuario.findOne({
      where: {
        ds_email: req.body.email   
      }
    });
  
 if(!usuario) {
    resp.send({ status: 'erro', mensagem: 'E-mail não existe'});
 }
 let codigo = getRandomInteger(1000, 9999);
 await db.infob_mw_usuario.update({
    ds_codigo_rec: codigo
 }, {
     where: {id_usuario: usuario.id_usuario}
 })
    enviarEmail(usuario.ds_email, 'Recuperação De Senha', `
    <h3> Recuperação de senha </h3>
    <p> Sua recuperação de senha da sua conta foi atendida 
    <p> insira esse código ${codigo} para recuper sua conta
    
    `) 
    resp.send({ status: 'Código Enviado'});
})


app.post('/validarcodigo', async (req, resp) => {
    const usuario = await db.infob_mw_usuario.findOne ({
        where : {
            ds_email: req.body.email
        }
     });

     console.log(usuario.ds_codigo_rec)

     if(!usuario) {
        resp.send({ status: 'erro', mensagem: 'E-mail não existe'});
     }
     if (usuario.ds_codigo_rec != req.body.code) {
        resp.send({ status: 'erro', mensagem: 'Código inválido.'});
     } else {
      resp.send({ status: 'ok', mensagem: 'Código validado.'});   
    }
     
}) 

app.put('/resetarsenha', async (req, resp) => {
  const novaSenha = req.body.novaSenha
  const cryptoSenha2 =  crypto.SHA256(novaSenha).toString(crypto.enc.Base64); 
  const usuario = await db.infob_mw_usuario.findOne ({
    where : {
        ds_email: req.body.email
    }
 });
  if(!usuario) {
      resp.send({ status: 'erro', mensagem: 'E-mail não existe'});
  }
  if (usuario.ds_codigo_rec != req.body.code || usuario.ds_codigo_rec === '') {
      resp.send({ status: 'erro', mensagem: 'Código inválido.'});
  }
  await db.infob_mw_usuario.update({
      ds_senha: cryptoSenha2,
      ds_codigo_rec: null
  }, {  
  where: { id_usuario: usuario.id_usuario }
  })
  resp.send({ status: 'ok', mensagem: 'Senha alterada.' });
  })



export default app