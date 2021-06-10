const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const env = require('dotenv');
const request = require('request');
const path = require('path');
const port = process.env.PORT || 5000;
const enforce = require('express-sslify');

const app = express();

app.use(enforce.HTTPS({ trustProtoHeader: true }));

env.config();

//Body Parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//Email Post Route
app.post('/send', (req, res) => {

  let notFilled = false;
  let formatVerified = false;
  let recaptchaVerified = false;

  if(req.body.name && req.body.bizname && req.body.amount && req.body.phone && req.body.email) {
    let phoneRegex = /^\+?\d{0,3}\s?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}?$/;
    let emailRegex = /\S+@\S+\.\S+/;
    formatVerified = phoneRegex.test(req.body.phone) && emailRegex.test(req.body.email);
  } else {
    notFilled = true;
  }

  function verifyRecaptcha() {
    const recaptchaVerifyUrl = `https://google.com/recaptcha/api/siteverify?secret=${process.env.SECRET_KEY}&response=${req.body.recaptcha}&remoteip=${req.connection.remoteAddress}`;
    request(recaptchaVerifyUrl, function (err, response, body) {
      body = JSON.parse(body);

      console.log(body);

      if(body.success !== undefined && !body.success) {
        res.status(500).json({ emailSent: false, verify: false, status: 500, clientError: 'reCaptcha failed. Please try again.'});
      } else {
        main();
      }
    });
  }

  async function main() {
    // create reusable transporter object using the default SMTP transport
   let transporter = nodemailer.createTransport({
     host: process.env.EMAIL_HOST,
     port: process.env.EMAIL_PORT,
     secure: false, // true for 465, false for other ports
     auth: {
       user: process.env.EMAIL_USERNAME,
       pass: process.env.EMAIL_PASSWORD
     },
     tls: {
       rejectUnauthorized: true
     },
     ignoreTLS: false,
     requireTLS: true
   });

   const emailHtmlTemplateMunnyNest = `
      <h3>New Prospect<h3>
      <ul>
        <li>Prospect #${req.body.id}</li>
        <li>Owner Name: ${req.body.name}</li>
        <li>Business Name: ${req.body.bizname}</li>
        <li>Business Type: ${req.body.biztype}</li>
        <li>Amount Requested: ${req.body.amount}</li>
        <li>Phone Number: ${req.body.phone}</li>
        <li>Email: ${req.body.email}</li>
        <li>Message: ${req.body.message}</li>
        <li>Spanish: ${req.body.spanish ? 'Yes' : 'No'}</li>
      <ul>
   `;

   const ext = 'com';
   const name = 'info';
   const domain = 'munnynest';
   const e = name + '@' + domain + '.' + ext;

   const emailHtmlTemplateConfirmation = `
   <body style="padding:0; margin:0; width:100% !important; -webkit-text; size-adjust:100%; -ms-text-size-adjust:100%; margin:0; padding:0; @import url('https://fonts.googleapis.com/css?family=Poppins');">
   <table border="0" cellpadding="0" cellspacing="0" style="margin: 0; padding: 0" width="100%">
       <tbody>
         <tr>
             <td align="left" valign="top" style="border-collapse: collapse; padding-bottom: 15px;">
               <h3 style="font-family: 'Poppins', sans-serif;">Hello ${req.body.name}!</h3>
               <p style="font-family: 'Poppins', sans-serif;">Thank you for your interest and submission of your pre-qual application. <br> One of our advisors will be contacting you within 24-48 hours.</p>
             </td>
         </tr>
       </tbody>
   </table>
   <table border="0" cellpadding="0" cellspacing="0" style="margin: 0; padding: 0" width="100%">
       <tbody>
         <tr>
             <td align="left" style="border-collapse: collapse;" width='140'>
               <img alt='Logo Not Found!' src='https://drive.google.com/uc?export=download&id=1-KqUGPurnSwYLByH2BeYqLulvW8i4cVf' width="125"></img>
             </td>
             <td style="border-collapse: collapse;">
               <h4 style="margin: 0px; font-family: 'Poppins', sans-serif;">Munny Nest LLC</h4>
               <p style="margin: 0px; font-family: 'Poppins', sans-serif;">
                 O: 833.686.9678
                 <br>
                 E: ${e}
                 <br>
                 W: www.munnynest.com
               </p>
             </td>
         </tr>
       </tbody>
     </table>
    </body>`;

   const emailHtmlTemplateConfirmationSpanish = `
   <body style="padding:0; margin:0; width:100% !important; -webkit-text; size-adjust:100%; -ms-text-size-adjust:100%; margin:0; padding:0; @import url('https://fonts.googleapis.com/css?family=Poppins');">
   <table border="0" cellpadding="0" cellspacing="0" style="margin: 0; padding: 0" width="100%">
       <tbody>
         <tr>
             <td align="left" valign="top" style="border-collapse: collapse; padding-bottom: 15px;">
               <h3 style="font-family: 'Poppins', sans-serif;">Hola ${req.body.name}!</h3>
               <p style="font-family: 'Poppins', sans-serif;">Gracias por su interés y la presentación de su solicitud de precalificación.<br> Uno de nuestros asesores lo contactará en un plazo de 24 a 48 horas.</p>
             </td>
         </tr>
       </tbody>
   </table>
   <table border="0" cellpadding="0" cellspacing="0" style="margin: 0; padding: 0" width="100%">
       <tbody>
         <tr>
             <td align="left" style="border-collapse: collapse;" width='140'>
               <img alt='Logo Not Found!' src='https://drive.google.com/uc?export=download&id=1-KqUGPurnSwYLByH2BeYqLulvW8i4cVf' width="125"></img>
             </td>
             <td style="border-collapse: collapse;">
               <h4 style="margin: 0px; font-family: 'Poppins', sans-serif;">Munny Nest LLC</h4>
               <p style="margin: 0px; font-family: 'Poppins', sans-serif;">
                 O: 833.686.9678
                 <br>
                 E: ${e}
                 <br>
                 W: www.munnynest.com
               </p>
             </td>
         </tr>
       </tbody>
     </table>
    </body>`;

   // setup email data with unicode symbols
   let mailOptionsMunnyNest = {
     from: 'MunnyNest Info <' + e + '>', // sender address
     to: e, // list of receivers
     subject: 'New Prospect - ' + req.body.name, // Subject line
     html: emailHtmlTemplateMunnyNest // html body
   };

   //console.log("Recipient email", req.body.email);

   let mailOptionsConfirmation = {
     from: 'MunnyNest Info <' + e + '>', // sender address
     to: req.body.email, // list of receivers
     subject: 'Pre-Qual Application #' + req.body.id, // Subject line
     html: emailHtmlTemplateConfirmation // html body
   };

   let mailOptionsConfirmationSpanish = {
     from: 'MunnyNest Info <' + e + '>', // sender address
     to: req.body.email, // list of receivers
     subject: 'Aplicación pre-calificación #' + req.body.id, // Subject line
     html: emailHtmlTemplateConfirmationSpanish // html body
   }

   try {
     // // send mail with defined transport object
     let infoMN = await transporter.sendMail(mailOptionsMunnyNest);
     console.log("Message sent to MunnyNest: %s", infoMN.messageId);
     res.status(200).json({ emailSent: true, verify: true, status: 200, emailInfo: infoMN });

     //send confirmation email
     if(req.body.spanish) {
       let infoConfirmationSpanish = await transporter.sendMail(mailOptionsConfirmationSpanish);
       console.log("Message sent to recipient: %s", infoConfirmationSpanish.messageId);
     } else {
       let infoConfirmation = await transporter.sendMail(mailOptionsConfirmation);
       console.log("Message sent to recipient: %s", infoConfirmation.messageId);
     }

   } catch (err) {
     console.error(err);
     res.status(500).json({ emailSent: false, verify: true, status: 500, error: err});
   }
 }

 if(!notFilled) {
   if (!formatVerified) {
     res.status(500).json({ emailSent: false, verify: false, status: 500, clientError: 'Please enter valid phone & email.'});
   } else {
     verifyRecaptcha();
   }
 } else {
   res.status(500).json({ emailSent: false, verify: false, status: 500, clientError: 'Form not filled with required fields.'});
 }
});

//Serving Production
if(process.env.NODE_ENV == 'production') {
  app.disable('x-powered-by');
  app.use(express.static(path.join(__dirname, 'client/build')));
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

app.listen(port, () => console.log('Server started on port ' + port + '...'));
