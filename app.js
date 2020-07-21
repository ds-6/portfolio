const express = require('express');
const nodemailer =  require('nodemailer');
require('dotenv').config();

const app = express();
app.listen(process.env.PORT||3000,()=>{
    console.log('Listening...')
});

app.set('view engine','ejs');
app.use(express.static('public'));
app.use(express.urlencoded({extended:true}));
app.use(express.json())

app.get('/', (req,res)=>{
    res.render('index',{msg:null});
})

app.post('/email', ( req, res)=>{
    const mail = `
        <h2>Deepak You have a new message</h2>
        <ul>
            <li>Email: ${req.body.email}</li>
            <li>Message: ${req.body.textarea}</li>
            <li>Required Date: ${req.body.date}</li>
            <li>Web Dev: ${req.body.webdev}</li>
            <li>Web Design: ${req.body.webdesign}</li>
        </ul>
    `;

    let transporter = nodemailer.createTransport({
        host: 'smtp-mail.outlook.com',
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: 'ds10@outlook.in',
            pass: `${process.env.MAIL_KEY}`
        },
        tls:{
            ciphers:'SSLv3'
        }
      });
    
      // setup email data with unicode symbols
      let mailOptions = {
          from: 'ds10@outlook.in', // sender address
          to: 'deepaksoni06@gmail.com', // list of receivers
          subject: 'Node Contact Request', // Subject line
          text: 'New Message', // plain text body
          html: mail // html body
      };
    
      // send mail with defined transport object
      transporter.sendMail(mailOptions, (error, info) => {
          if (error) {
              return console.log(error);
          }
          console.log('Message sent: %s', info.messageId);   
          console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
    
          res.render('index', {msg:'Message has been sent'});
      });
    
})