const fs = require('fs/promises');
const crypto = require('crypto');

const generateId = () => {
  // https://stackoverflow.com/questions/23327010/how-to-generate-unique-id-with-node-js
  const string = crypto.randomBytes(16).toString('hex');
  const id = `${string.substring(0, 8)}-${string.substring(8, 12)}-${string
      .substring(12, 16)}-${string.substring(16, 20)}-${string.substring(20)}`;
  return id;
};

const readPeople = async () => {
  const response = await fs.readFile('./pessoas.json', 'utf-8');
  const people = JSON.parse(response);
  return people;
};

const addPeople = async (person) => {
  const people = await readPeople();
  people.push({ ...person, id: generateId() });
  await fs.writeFile('./pessoas.json', JSON.stringify(people));
  return people;
};

const updatePerson = async (person, id) => {
  const people = await readPeople();
  const index = people.findIndex((p) => p.id === id);
  if (index === -1) throw new Error('Person not found');
  people[index] = { ...people[index], ...person };
  await fs.writeFile('./pessoas.json', JSON.stringify(people));
  return people;
}

module.exports = { readPeople, addPeople, updatePerson };
