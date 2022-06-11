const { Router } = require('express');
const rescue = require('express-rescue');
const token = require('./generateToken');
const { readUser, addUser } = require('./readUser');
const validateUser = require('./validateUser');

const loginRoute = Router();

loginRoute.post('/login', rescue(async (req, res) => {
  const { email, password } = req.body;
  const users = await readUser();
  const user = users.find((u) => u.email === email);
  if (!user || user.password !== password) {
    return res.status(403).json({ message: 'wrong email or password' });
  }
  res.status(200).json({ token: token() });
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
