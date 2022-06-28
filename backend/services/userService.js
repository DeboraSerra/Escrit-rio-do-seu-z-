const userModel = require('../models/userModel');

const readUser = async () => {
  const users = await userModel.readUser();
  return users;
}

const addUser = async (user) => {
  const users = await userModel.readUser();
  const exists = users.some((u) => u.email === user.email);
  if (exists) throw new Error('User already exists');
  const id = users.length + 1;
  users.push({ ...user, id });
  await userModel.addUser(users);
  return true;
}

module.exports = { readUser, addUser };
