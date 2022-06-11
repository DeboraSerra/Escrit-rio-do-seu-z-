const express = require('express');
const validateToken = require('./validateToken');

const loginRoute = require('./loginRoutes');
const peopleRoute = require('./peopleRoute');

const app = express();
app.use(express.json());
app.listen(3005, () => console.log('Open on door 3005'));

app.use('/user', loginRoute);

app.use(validateToken);

app.use('/people', peopleRoute);

app.all('*', (_req, res) => {
  res.status(404).send('Page not found');
})

app.use((err, _req, res, _next) => {
  res.status(500).json({ message: err.message });
});
