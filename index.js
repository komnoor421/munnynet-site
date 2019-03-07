const express = require('express');
const path = require('path');
const port = process.env.PORT || 5000;

const app = express();

app.get('/server', (req, res) => {
  res.send('Hello World');
});

if(process.env.NODE_ENV == 'production') {
  app.disable('x-powered-by');
  app.use(express.static(path.join(__dirname, 'client/build')));
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

app.listen(port, () => console.log('Server started...'));
