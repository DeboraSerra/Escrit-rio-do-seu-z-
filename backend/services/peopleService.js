const peopleModel = require('../models/peopleModel');
const crypto = require('crypto');

const generateId = () => {
  // https://stackoverflow.com/questions/23327010/how-to-generate-unique-id-with-node-js
  const string = crypto.randomBytes(16).toString('hex');
  const id = `${string.substring(0, 8)}-${string.substring(8, 12)}-${string
      .substring(12, 16)}-${string.substring(16, 20)}-${string.substring(20)}`;
  return id;
};

const isValid = ({ first_name, last_name, birthday, email }) => {
  if (!first_name || !last_name) throw new Error('Invalid name');
  if (!birthday) throw new Error('Invalid birthday');
  const isBirthValid = birthday.match(/^\d{4}-\d{2}-\d{2}/g);
  if (!isBirthValid) throw new Error('Invalid birthday');
  if (!email) throw new Error('Invalid email');
  const isEmailValid = email.match(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g);
  if (!isEmailValid) throw new Error('Invalid email');
  return true;
}

const readPeople = async () => {
  const people = await peopleModel.readPeople();
  return people;
};

const addPerson = async (person) => {
  isValid(person);
  const people = await peopleModel.readPeople();
  people.push({ person, id: generateId() });
  await peopleModel.addPeople(people);
  return true;
};

const updatePerson = async (person) => {
  isValid(person);
  const people = await peopleModel.readPeople();
  people.push(person);
  await peopleModel.addPeople(people);
  return true;
};

const deletePerson = async (id) => {
  const people = await peopleModel.readPeople();
  const newPeople = people.filter((p) => p.id !== id);
  if (people.length === newPeople.length) throw new Error('Person not found');
  await peopleModel.deletePerson(newPeople);
  return true;
};

module.exports = { readPeople, addPerson, updatePerson, deletePerson };
