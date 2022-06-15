const { readUser, addUser } = require('../services/readUser');
const fs = require('fs/promises');
const sinon = require('sinon');
const { afterEach } = require('mocha');
const mockUsers = require('./mockUsers');
const { expect } = require('chai');

describe('readUser', () => {
  afterEach(() => sinon.restore())
  it('verifies if the function readUser returns the users registered', async () => {
    sinon.stub(fs, 'readFile').returns(JSON.stringify(mockUsers))
    const response = await readUser();
    expect(response).to.be.deep.equals(mockUsers);
  });
});

describe('addUser', () => {
  afterEach(sinon.restore);
  it('verifies if the function addUser add a new user to the file', async () => {
    const newUser = {
      email: 'test@test.com',
      password: '123456',
      name: 'Test',
    }
    sinon.stub(fs, 'readFile')
      .onFirstCall().returns(JSON.stringify(mockUsers))
      .onSecondCall().returns(JSON.stringify([ ...mockUsers, { ...newUser, id: 3 } ]));
    sinon.stub(fs, 'writeFile').alwaysCalledWith('./mockUsers.js');
    await addUser(newUser);
    const response = await readUser();
    expect(response[2]).to.deep.equal({ ...newUser, id: 3 });
  });
  it('throws an error if the user already exists', async () => {
    const newUser = {
      "email":"debora.r.serra@gmail.com",
      "password":"debs123!",
      "name":"Débora Serra",
      "id":1
    }
    sinon.stub(fs, 'readFile')
      .returns(JSON.stringify(mockUsers))
    sinon.stub(fs, 'writeFile');
    try {
      const response = await addUser(newUser);
    } catch (err) {
      expect(err.message).to.be.equal('User already exists');
    }
  });
});
