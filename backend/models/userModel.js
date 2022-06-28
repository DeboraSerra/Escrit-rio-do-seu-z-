const fs = require('fs/promises');
const path = require('path');

const userPath = path.resolve('./models', 'user.json');

// const userPath = './user.json';

const readUser = async () => {
  const response = await fs.readFile(userPath, 'utf-8');
  const users = JSON.parse(response);
  return users;
};

const addUser = async (users) => {
  await fs.writeFile(userPath, JSON.stringify(users));
  return users;
};

module.exports = { readUser, addUser };
