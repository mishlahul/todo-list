const express = require('express');
const routes = require('./routes');
const port = 3030;

async function startServer() {
  const app = express();

  app.listen(port, (err) => {
    if (err) {
      process.exit(1);
    }
    console.log('Server started, port opened at ' + port);
  });

  app.use(express.json());
  app.use('/', routes());
  app.get('/', (req, res) => {
    res.send('Welcome to Todo List API');
  });
}

startServer();
