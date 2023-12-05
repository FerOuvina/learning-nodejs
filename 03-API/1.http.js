const http = require('node:http');
const fs = require('node:fs');

const desiredPort = process.env.PORT ?? 3000;

const processRequest = (req, res) => {
  res.setHeader('Content-Type', 'text/html; charset=utf-8');

  if (req.url === '/') {
    res.statusCode = 200;
    res.end('<h1>Welcome to the Home Page</h1>');
  } else if (req.url === '/img') {
    fs.readFile('./random.jpg', (err, data) => {
      if (err) {
        res.statusCode = 500;
        res.end('<h1>Error 500 Internal Server Error</h1>');
      } else {
        res.setHeader('Content-Type', 'image/jpeg');
        res.end(data);
      }
    });
  } else if (req.url === '/contact') {
    res.statusCode = 200;
    res.end('<h1>Contact Page</h1>');
  } else {
    res.statusCode = 404;
    res.end('<h1>Error 404 page not found</h1>');
  }
};

const server = http.createServer(processRequest);

server.listen(desiredPort, () => {
  console.log(`Server is listening on port ${desiredPort}`);
});
