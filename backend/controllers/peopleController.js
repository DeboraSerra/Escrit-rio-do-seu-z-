const peopleService = require('../services/peopleService');

const readPeople = async (_req, res) => {
  const people = await peopleService.readPeople();
  res.status(200).json(people);
}

const queryPeople = async (req, res) => {
  const { q } = req.query;
  const people = await peopleService.readPeople();
  const filteredPeople = people.filter((p) => p.first_name.includes(q));
  res.status(200).json(filteredPeople);
}

const findById = async (req, res) => {
  const { id } = req.params;
  const people = await peopleService.readPeople();
  const person = people.find((p) => p.id === id);
  if (!person) return res.status(404).json({ message: 'person not found' });
  res.status(200).json(person);
}

const addPeople = async (req, res) => {
  const { firstName, lastName, birthday,
    city, email, phone, state, address } = req.body;
  const newPerson = {
    first_name: firstName,
    last_name: lastName,
    birthday: birthday.split('-').reverse().join('-'),
    city,
    email,
    phone,
    state,
    address,
  }
  await peopleService.addPerson(newPerson);
  res.status(201).end();
}

const updatePerson = async (req, res) => {
  const { id } = req.params;
  const { firstName, lastName, birthday,
    city, email, phone, state, address } = req.body;
  const newPerson = {
    first_name: firstName,
    last_name: lastName,
    birthday: birthday.split('-').reverse().join('-'),
    city,
    email,
    phone,
    state,
    address,
  }
  await updatePerson({ ...newPerson, id });
  res.status(202).end();
}

const deletePerson = async (req, res) => {
  const { id } = req.params;
  await peopleService.deletePerson(id);
  res.status(204).end();
}

module.exports = {
  readPeople,
  queryPeople,
  findById,
  addPeople,
  updatePerson,
  deletePerson,
}
