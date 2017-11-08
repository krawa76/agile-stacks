'use strict';

const http = require('http');

const port = 3000;

http.createServer((req, res) => {
  res.end('simple web app');
}).listen(port);
