const { Router } = require('express');
const rescue = require('express-rescue');
const userController = require('../controllers/userController');

const loginRoute = Router();

loginRoute.post('/login', rescue(userController.getUser));

loginRoute.post(
  '/register',
  rescue(userController.validateUser),
  rescue(userController.addUser),
);

module.exports = loginRoute;
