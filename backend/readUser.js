const fs = require('fs/promises');

const readUser = async () => {
  const response = await fs.readFile('./user.json', 'utf-8');
  const users = JSON.parse(response);
  return users;
};

const addUser = async (user) => {
  const users = await readUser();
  if (users.some((u) => u.email === user.email)) {
    throw new Error('User already exists');
  }
  const id = users.length + 1;
  users.push({ ...user, id });
  await fs.writeFile('./user.json', JSON.stringify(users));
};

module.exports = { readUser, addUser };
