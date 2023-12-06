const express = require('express');
const jsonServer = require('json-server');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());

const server = jsonServer.create();
const router = jsonServer.router('db.json');

server.use(router);

app.use('/api', server);

app.listen(port, () => {
  console.log(`JSON Server is running on port ${port}`);
});