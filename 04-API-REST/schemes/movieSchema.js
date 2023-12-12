const zod = require('zod');

const movieSchema = zod.object({
  title: zod.string({
    invalid_type_error: 'Title must be a string',
    required_error: 'Title is required'
  }),
  year: zod.number().int().min(1900).max(2023),
  director: zod.string(),
  duration: zod.number().int().min(1),
  rate: zod.number().min(0).max(10).default(0),
  poster: zod.string().url({
    message: 'Invalid URL'
  }),
  genre: zod.array(
    zod.enum([
      'Action',
      'Comedy',
      'Drama',
      'Horror',
      'Romance',
      'Thriller',
      'Sci-Fi',
      'Crime'
    ])
  )
});

function validateMovie(object) {
  return movieSchema.safeParse(object);
}

function validatePartialMovie(object) {
  return movieSchema.partial().safeParse(object);
}

module.exports = { validateMovie, validatePartialMovie };
