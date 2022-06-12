const { Router } = require('express');
const rescue = require('express-rescue');
const fs = require('fs/promises');
const { readPeople, addPeople, updatePerson } = require('./readPeople');
const { validateBirthday, validateEmail, validateName } = require('./validatePeople');

const peopleRoute = Router();

peopleRoute.get(
  '/',
  rescue(async (_req, res) => {
    const people = await readPeople();
    res.status(200).json(people);
}));

peopleRoute.get('/search', rescue(async (req, res) => {
  const { q } = req.query;
  const people = await readPeople();
  const filteredPeople = people.filter((p) => p.name.includes(q));
  res.status(200).json(filteredPeople);
}));

peopleRoute.get('/:id', rescue(async (req, res) => {
  const { id } = req.params;
  const people = await readPeople();
  const person = people.find((p) => p.id === id);
  if (!person) return res.status(404).json({ message: 'person not found' });
  res.status(200).json(person);
}));

peopleRoute.post(
  '/',
  rescue(validateName),
  rescue(validateEmail),
  rescue(validateBirthday),
  rescue(async (req, res) => {
    const { firstName, lastName, birthday,
      city, email, phone, state, address } = req.body;
    const newPerson = {
      first_name: firstName,
      last_name: lastName,
      birthday,
      city,
      email,
      phone,
      state,
      address,
    }
    await addPeople(newPerson);
    res.status(201).end();
  }),
);

peopleRoute.put(
  '/:id',
  rescue(validateName),
  rescue(validateEmail),
  rescue(validateBirthday),
  rescue(async (req, res) => {
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
    console.log(newPerson);
    await updatePerson(newPerson, id);
    res.status(202).end();
  })
);

peopleRoute.delete('/:id', rescue(async (req, res) => {
  const { id } = req.params;
  const people = await readPeople();
  const inactive = JSON.parse(await fs.readFile('./inactivePeople.json', 'utf-8'));
  console.log(inactive);
  const index = people.findIndex((p) => p.id === id);
  if (index === -1) return res.status(404).json({ message: 'Person not found' });
  inactive.push(people[index]);
  people.splice(index, 1);
  await fs.writeFile('./inactivePeople.json', JSON.stringify(inactive));
  await fs.writeFile('./pessoas.json', JSON.stringify(people));
  res.status(204).end();
}))

module.exports = peopleRoute;
