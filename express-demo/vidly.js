const Joi = require('joi');
const express = require('express');
const app = express();

app.use(express.json());

const genres = [
  { id: 1, type: 'horror' }, 
  { id: 2, type: 'action' }, 
];

//Manage the list of genres
//Get list of all genres
//Create a new genre
//Update or delete an existsing genre

app.get('/', (req, res) => {
  res.send('Welcome to Vidly!');
});

app.get('/api/genres', (req, res) => {
  res.send(genres);
});

app.get('/api/genres/:id', (req, res) => {
  const genre = genres.find(g => g.id === Number(req.params.id));
  if (!genre) return res.status(404).send(`Sorry, the genre with the ID of ${req.params.id} was not found.`);
  res.send(genre);
});

app.post('/api/genres', (req, res) => {
  const { error } = validateGenre(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const genre = {
    id: genres.length + 1,
    type: req.body.type,
  };

  genres.push(genre);
  res.send(genres);
});

app.put('/api/genres/:id', (req, res) => {
  const genre = genres.find(g => g.id === Number(req.params.id));
  if (!genre) return res.status(404).send(`Sorry, the genre with the ID of ${req.params.id} was not found.`);
  
  const { error } = validateGenre(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  genre.type = req.body.type;
  res.send(genres);
});

app.delete('/api/genres/:id', (req, res) => {
  const genre = genres.find(g => g.id === Number(req.params.id));
  if (!genre) return res.status(404).send(`Sorry, the genre with the ID of ${req.params.id} was not found.`);
  
  const idx = genres.indexOf(genre);
  genres.splice(idx, 1);

  res.send(genres);
})

const port = process.env.PORT1 || 3000;
app.listen(port, () => console.log(`Port ${port}...`));

function validateGenre(genre) {
  const schema = Joi.object({
    type: Joi.string().min(4).required(),
  });
  return schema.validate(genre);
}