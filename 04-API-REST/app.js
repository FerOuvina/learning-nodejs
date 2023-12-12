const express = require('express');
const crypto = require('node:crypto');
const {
  validateMovie,
  validatePartialMovie
} = require('./schemes/movieSchema.js');
const movies = require('./movies');

const app = express();
app.use(express.json());
app.disable('x-powered-by');

app.get('/movies', (req, res) => {
  res.header('Access-Control-Allow-Origin', '*');

  const { genre } = req.query;
  if (genre) {
    const filteredMovies = movies.filter((movie) =>
      movie.genre.some((g) => g.toLowerCase() === genre.toLowerCase())
    );
    return res.json(filteredMovies);
  }
  res.json(movies);
});

app.post('/movies', (req, res) => {
  const result = validateMovie(req.body);
  if (result.error) {
    return res.status(400).json({ error: JSON.parse(result.error.message) });
  }

  const newMovie = {
    id: crypto.randomUUID(),
    ...result.data
  };

  movies.push(newMovie);
  res.status(201).json(newMovie);
});

app.delete('/movies/:id', (req, res) => {
  const { id } = req.params;
  const movieIndex = movies.findIndex((m) => m.id === id);
  if (movieIndex === -1) {
    return res.status(404).json({ error: 'Movie not found' });
  }

  movies.splice(movieIndex, 1);
  res.status(204).end();
});

app.patch('/movies/:id', (req, res) => {
  const result = validatePartialMovie(req.body);

  if (result.error) {
    return res.status(400).json({ error: JSON.parse(result.error.message) });
  }

  const { id } = req.params;
  const movieIndex = movies.findIndex((m) => m.id === id);
  if (movieIndex === -1) {
    return res.status(404).json({ error: 'Movie not found' });
  }

  const updatedMovie = {
    ...movies[movieIndex],
    ...result.data
  };

  return res.json(updatedMovie);
});

app.get('/movies/:id', (req, res) => {
  const { id } = req.params;
  const movie = movies.find((m) => m.id === id);
  if (!movie) {
    return res.status(404).json({ error: 'Movie not found' });
  } else {
    return res.json(movie);
  }
});

app.options('/movies/:id', (req, res) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE');
  res.send(200);
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
