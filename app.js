const express=require('express');
const app=express();
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static(__dirname + '/public'));

 app.post("/contacto", function(req, res) {
    let contacto = req.body.contacto;
    const output = `
        <p>Tienes una nueva solicitud!!!!</p>
        <h3> Detalles de la solicitud de: ${contacto.razonSocial} </h3> 
        <ul>
            <li>Nombre: ${contacto.nombre}</li>
            <li>Teléfono: ${contacto.telefono}</li>
            <li>Correo electrónico: ${contacto.email}</li>
            <li>Descripción o Comentario: ${contacto.desCom}</li>
        </ul> 
    `;
    let transporter = nodemailer.createTransport({
        host: 'hidromexturbocina.com',
        port: 587,
        secure: false,
        tls:{
            rejectUnauthorized: false
        },
        auth: {
            user: 'contacto@hidromexturbocina.com',
            pass: '?ra91f9V'
        }
    })
    let mailOptions = {
        from: '"HIDROMEX CONTACTO" <contacto@hidromexturbocina.com>',
        to: 'contacto@hidromexturbocina.com',
        subject: 'NUEVA SOLICITUD!!!!',
        html: output
    };
    transporter.sendMail(mailOptions, (error, info) => {
        if(error) {
            return console.log(error);
        }
    })
    res.render('ok');
}) 

const server = app.listen(process.env.PORT || 3000, () => {
  console.log('Esta Vivo');
});