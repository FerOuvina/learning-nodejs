const express = require('express');
const dittoJSON = require('./pokemon/ditto.json');
const app = express();
app.disable('x-powered-by');
const PORT = process.env.PORT || 3000;

app.use((req, res, next) => {
  if (req.method !== 'POST') return next();
  if (req.headers['content-type'] !== 'application/json') return next();

  let body = '';

  req.on('data', (chunk) => {
    body += chunk.toString();
  });

  req.on('end', () => {
    const data = JSON.parse(body);
    data.timestamp = Date.now();
    req.body = data;
    next();
  });
});

app.get('/', (req, res) => {
  res.status(200).send('Hello World!');
});

app.get('/pokemon/ditto', (req, res) => {
  res.status(200).json(dittoJSON);
});

app.post('/pokemon', (req, res) => {
  res.status(201).json(req.body);
});

app.use((req, res) => {
  res.status(404).send('Not Found');
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
