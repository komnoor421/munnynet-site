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
   let transporter = nodemailer.createTransport({
     host: 'smtp.office365.com',
     port: 587,
     secure: false, // true for 465, false for other ports
     auth: {
       user: 'info@munnynest.com',
       pass: 'yasamanrose23&'
     },
     tls: {
       rejectUnathorized: false
     }
   });

   const emailHtmlTemplate = `
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
   `

   // setup email data with unicode symbols
   let mailOptions = {
     from: 'info@munnynest.com', // sender address
     to: 'info@munnynest.com', // list of receivers
     subject: 'New Prospect - ' + req.body.name, // Subject line
     html: emailHtmlTemplate // html body
   };

   try {
     // send mail with defined transport object
     let info = await transporter.sendMail(mailOptions);
     console.log("Message sent: %s", info.messageId);
     res.status(200).json({ emailSent: true, status: 200, emailInfo: info });
   } catch (err) {
     console.error(err);
     res.status(500).json({ emailSent: false, status: 500, error: err});
   }
 }

 main();
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
