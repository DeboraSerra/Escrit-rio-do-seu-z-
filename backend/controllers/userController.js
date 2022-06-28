const userService = require('../services/userService');
const token = require('../helpers/generateToken');

const getUser = async (req, res) => {
  const { email, password } = req.body;
  const users = await userService.readUser();
  const user = users.find((u) => u.email === email);
  if (!user || user.password !== password) {
    return res.status(403).json({ message: 'wrong email or password' });
  }
  res.status(200).json({ token: token(), user: user.name });
}

const validateUser = (req, res, next) => {
  const { email, password, name } = req.body;
  if (!name) return res.status(400).json({ message: 'name is required' });
  if (!email) return res.status(400).json({ message: 'email is required' });
  if (!password) return res.status(400).json({ message: 'password is required' });
  const isValidEmail = email.match(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g);
  if (!isValidEmail) return res.status(400).json({ message: 'invalid email' });
  const isValidPass = password.length >= 6 && password.match(/\w+\W+/g);
  if (!isValidPass) return res.status(400).json({ message: 'invalid password' });
  next();
};

const addUser = async (req, res) => {
  const { email, password, name } = req.body;
  await userService.addUser({ email, password, name });
  res.status(201).json({ message: 'User created' });
}

module.exports = { getUser, validateUser, addUser };
