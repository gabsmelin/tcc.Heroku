import express from 'express'
import cors from 'cors'

import Usuario from './Controller/usuarioController.js';
import Comentario from './Controller/comentarioController.js';
import FilmeUsu from './Controller/filmeUsuController.js';
import Filme from './Controller/filmeController.js';
import Lista from './Controller/listaController.js';
import ListaItem from './Controller/listaItemController.js';
import Login from './Controller/loginController.js';



const app = express();
app.use(cors());
app.use(express.json());

app.use('/filme', Filme)
app.use('/filusu', FilmeUsu)
app.use('/lista', Lista)
app.use('/listem', ListaItem)
app.use('/usuario', Usuario)
app.use('/comentario', Comentario)
app.use('/login', Login)

app.listen(process.env.PORT, () => console.log(`Subiu a api, hehe ${process.env.PORT}`))