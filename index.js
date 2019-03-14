const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const path = require('path');
const port = process.env.PORT || 5000;

const app = express();

//Body Parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//Test Route
// app.get('/hello', (req, res) => {
//   res.send('Hello World');
// });

//Email Post Route
app.post('/send', (req, res) => {

  async function main() {
    // create reusable transporter object using the default SMTP transport
   // let transporter = nodemailer.createTransport({
   //   host: '',
   //   port: ,
   //   secure: false, // true for 465, false for other ports
   //   auth: {
   //     user: '',
   //     pass: ''
   //   },
   //   tls: {
   //     rejectUnathorized: false
   //   }
   // });

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
      <ul>
   `;

   const emailHtmlTemplateConfirmation = `
      <h2>Hello ${req.body.name}!<h2>
      <p>Thank you for your interest and submission of your pre-qual application.</p>
      <p>One of our advisors will be contacting you within 24-48 hours.</p>
   `;

   // setup email data with unicode symbols
   let mailOptionsMunnyNest = {
     from: '', // sender address
     to: '', // list of receivers
     subject: 'New Prospect - ' + req.body.name, // Subject line
     html: emailHtmlTemplateMunnyNest // html body
   };

   //console.log("Recipient email", req.body.email);

   let mailOptionsConfirmation = {
     from: '', // sender address
     to: req.body.email, // list of receivers
     subject: 'Pre-Qual Application #' + req.body.id, // Subject line
     html: emailHtmlTemplateConfirmation // html body
   };

   // try {
   //   // // send mail with defined transport object
   //   let infoMN = await transporter.sendMail(mailOptionsMunnyNest);
   //   console.log("Message sent to MunnyNest: %s", infoMN.messageId);
   //   res.status(200).json({ emailSent: true, status: 200, emailInfo: infoMN });
   //
   //   //send confirmation email
   //   let infoConfirmation = await transporter.sendMail(mailOptionsConfirmation);
   //   console.log("Message sent to recipient: %s", infoConfirmation.messageId);
   // } catch (err) {
   //   console.error(err);
   //   res.status(500).json({ emailSent: false, status: 500, error: err});
   // }
 }

 //main();
});

//Serving Production
if(process.env.NODE_ENV == 'production') {
  app.disable('x-powered-by');
  app.use(express.static(path.join(__dirname, 'client/build')));
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

app.listen(port, () => console.log('Server started...'));
