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
app.get('/hello', (req, res) => {
  res.send('Hello World');
});

//Email Post Route
app.post('/send', (req, res) => {
  console.log(req.body);
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
