import express from 'express';
// import bodyParser from 'body-parser';

import usersRoutes from './routes/users.js';

const app = express();
const PORT = 5000;

app.use(express.json());

app.get('/users', usersRoutes);

app.get('/', (req, res) => res.send('Hello from Homepage'));

app.post('/users', usersRoutes);

app.get('/users/:id', usersRoutes);

app.delete('/users/:id', usersRoutes);

app.patch('/users/:id', usersRoutes);

app.listen(PORT, () => console.log(`Server Running on port: http://localhost:${PORT}`));