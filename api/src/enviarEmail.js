
import nodemailer from 'nodemailer'
const sender = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: 'movieworldcontacts@gmail.com',
    pass: 'tcc@mw2021',
  },
});


async function enviarEmail(para, assunto, mensagem) {
    const response = await sender.sendMail({
      from: '"Movie Word" <movieworldcontacts@gmail.com>',
      to: para, 
      subject: assunto,
      html: mensagem
    })
    return response;
  }

  
  export default enviarEmail;