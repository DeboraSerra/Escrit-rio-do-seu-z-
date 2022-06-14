const { readPeople, addPeople, updatePerson } = require('../readPeople');
const fs = require('fs/promises');
const sinon = require('sinon');
const mockPeople = require('./mockPeople');
const { expect } = require('chai');
const crypto = require('crypto');

const generateId = () => {
  // https://stackoverflow.com/questions/23327010/how-to-generate-unique-id-with-node-js
  const string = crypto.randomBytes(16).toString('hex');
  const id = `${string.substring(0, 8)}-${string.substring(8, 12)}-${string
      .substring(12, 16)}-${string.substring(16, 20)}-${string.substring(20)}`;
  return id;
};

describe('readPeople', () => {
  afterEach(sinon.restore);
  it('verifies if the function returns the right information', async () => {
    sinon.stub(fs, 'readFile').returns(JSON.stringify(mockPeople));
    const response = await readPeople();
    expect(response).to.be.deep.equal(mockPeople);
  });
  it('verifies if the function returns an array', async () => {
    sinon.stub(fs, 'readFile').returns(JSON.stringify(mockPeople));
    const response = await readPeople();
    expect(response).to.be.a('array');
  });
  it('verifies if the function has the right length', async () => {
    sinon.stub(fs, 'readFile').returns(JSON.stringify(mockPeople));
    const response = await readPeople();
    expect(response).to.have.length(5);
  });
});

describe('addPeople', () => {
  afterEach(sinon.restore);
  it('verifies if the function adds a person to the list', async () => {
    const newPerson = {
      "first_name": "Harry",
      "last_name": "Potter",
      "birthday": "31-07-1989",
      "city": "Little Whinging",
      "email": "harry.potter@hogwarts.com",
      "phone": "+3575676049522",
      "state": "Surrey",
      "address": "Cupboard under the stairs, 4, Privet Drive"
    }
    sinon.stub(fs, 'readFile')
      .returns(JSON.stringify(mockPeople))
    sinon.stub(fs, 'writeFile');
    const response = await addPeople(newPerson);
    const lastPerson = response[response.length - 1]
    expect(lastPerson.first_name).to.be.equal(newPerson.first_name);
  });
  it('checks if a random id is generated to a new person', async () => {
    const newPerson = {
      "first_name": "Harry",
      "last_name": "Potter",
      "birthday": "31-07-1989",
      "city": "Little Whinging",
      "email": "harry.potter@hogwarts.com",
      "phone": "+3575676049522",
      "state": "Surrey",
      "address": "Cupboard under the stairs, 4, Privet Drive"
    }
    sinon.stub(fs, 'readFile')
      .returns(JSON.stringify(mockPeople));
    sinon.stub(fs, 'writeFile');
    const response = await addPeople(newPerson);
    const lastPerson = response[response.length - 1]
    expect(lastPerson.first_name).to.be.equal(newPerson.first_name);
    expect(lastPerson.id).to.be.a('string');
    expect(lastPerson.id).not.to.be.equal(response[0].id);
  });
});

describe('updatePerson', () => {
  afterEach(sinon.restore);
  it('should throw an error if the id doesn\'t exists', async () => {
    const newPerson = {
      "first_name": "Harry",
      "last_name": "Potter",
      "birthday": "31-07-1989",
      "city": "Little Whinging",
      "email": "harry.potter@hogwarts.com",
      "phone": "+3575676049522",
      "state": "Surrey",
      "address": "Cupboard under the stairs, 4, Privet Drive"
    }
    sinon.stub(fs, 'readFile')
      .returns(JSON.stringify(mockPeople));
    sinon.stub(fs, 'writeFile');
    const randomId = generateId();
    try {
      const response = await updatePerson(newPerson, randomId);
    } catch (err) {
      expect(err.message).to.be.deep.equal('Person not found')
    }
  });
  it('should update the data of the person', async () => {
    const newPerson = {
      "first_name": "Harry",
      "last_name": "Potter",
      "birthday": "31-07-1989",
      "city": "Little Whinging",
      "email": "harry.potter@hogwarts.com",
      "phone": "+3575676049522",
      "state": "Surrey",
      "address": "Cupboard under the stairs, 4, Privet Drive"
    }
    const id = 'be9cfac4-4d72-386a-8912-eed311837403';
    sinon.stub(fs, 'readFile')
      .returns(JSON.stringify(mockPeople));
    sinon.stub(fs, 'writeFile');
    const response = await updatePerson(newPerson, id);
    expect(response[0].first_name).to.be.equal(newPerson.first_name);
    expect(response[0].id).to.be.equal(id);
  });
});
