const { Router } = require('express');
const rescue = require('express-rescue');
const token = require('../services/generateToken');
const { readUser, addUser } = require('../services/readUser');
const validateUser = require('../validations/validateUser');

const loginRoute = Router();

loginRoute.get('/login', rescue(async (req, res) => {
  const { email, password } = req.query;
  const users = await readUser();
  const user = users.find((u) => u.email === email);
  console.log(email);
  if (!user || user.password !== password) {
    return res.status(403).json({ message: 'wrong email or password' });
  }
  res.status(200).json({ token: token(), user: user.name });
}));

loginRoute.post(
  '/register',
  rescue(validateUser),
  rescue(async (req, res) => {
    const { email, password, name } = req.body;
    await addUser({ email, password, name });
    res.status(201).json({ message: 'User created' });
  }),
);

module.exports = loginRoute;
