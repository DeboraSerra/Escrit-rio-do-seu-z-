const fs = require('fs/promises');
const path = require('path');

const peoplePath = path.resolve('./models', 'pessoas.json');
const inactivePath = path.resolve('./models', './inactivePeople.json');
// const peoplePath = './pessoas.json';
// const inactivePath = './inactivePeople.json';

const readPeople = async () => {
  const response = await fs.readFile(peoplePath, 'utf-8');
  const people = JSON.parse(response);
  return people;
};

const addPeople = async (people) => {
  await fs.writeFile(peoplePath, JSON.stringify(people));
  return people;
};

const deletePerson = async (people, person) => {
  const file = await fs.readFile(inactivePath, 'utf-8') || '[]';
  const inactive = JSON.parse(file);
  inactive.push(person);
  await fs.writeFile(inactivePath, JSON.stringify(inactive));
  return await addPeople(people);
}

module.exports = { readPeople, addPeople, deletePerson };
