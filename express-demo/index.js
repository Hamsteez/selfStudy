const Joi = require('joi');
const express = require('express');
const app = express();

app.use(express.json());

const courses = [
  { id: 1, name: 'course1' },
  { id: 2, name: 'course2' },
  { id: 3, name: 'course3' },
]

app.get('/', (req, res) => {
  res.send('Hello World!!!');
});

app.get('/api/courses', (req, res) => {
  res.send(courses);
});

app.post('/api/courses', (req, res) => {
  const { error } = validateCourse(req.body); // same as result.error
  //400 Bad Request
  if (error) return res.status(400).send(error.details[0].message);

  const course = {
    id: courses.length + 1, 
    name: req.body.name,
  };
  courses.push(course);
  res.send(course);
});

app.get('/api/courses/:id', (req, res) => {
  const course = courses.find(c => c.id === Number(req.params.id));
  //404 Resource not found
  if (!course) return res.status(404).send('The course with the given ID was not found.');
  res.send(course);
});

app.put('/api/courses/:id', (req, res) => {
  //Look up the course
  //If nonexistent, return 404
  const course = courses.find(c => c.id === Number(req.params.id));
  //404 Resource not found
  if (!course) return res.status(404).send('The course with the given ID was not found.');

  //Validate
  //If invald, return 400
  // const result = validateCourse(req.body);
  const { error } = validateCourse(req.body); // same as result.error
  //400 Bad Request
  if (error) return res.status(400).send(error.details[0].message);

  //Update course
  course.name = req.body.name;
  //Return the updated course
  res.send(course);
});

app.delete('/api/courses/:id', (req, res) => {
  // Look up course, if nonexistent return 404
  const course = courses.find(c => c.id === Number(req.params.id));
  if (!course) return res.status(404).send('The course with the given ID was not found');

  // Delete
  const index = courses.indexOf(course);
  courses.splice(index, 1);

  // Return the same course
  res.send(course);
});

function validateCourse(course) {
  const schema = Joi.object({
    name: Joi.string().min(3).required()
  });

  return schema.validate(course);
}

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));