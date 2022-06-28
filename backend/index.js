const express = require('express');
const validateToken = require('./validations/validateToken');
const cors = require('cors');

const loginRoute = require('./routes/loginRoutes');
const peopleRoute = require('./routes/peopleRoute');

const app = express();
app.use(express.json());
app.use(cors())
app.listen(3005, () => console.log('Open on door 3005'));

app.use('/user', loginRoute);

app.use(validateToken);

app.use('/people', peopleRoute);

app.all('*', (_req, res) => {
  res.status(404).json({ message: 'Page not found' });
})

app.use((err, _req, res, _next) => {
  console.log(err.message);
  res.status(500).json({ message: err.message });
});
