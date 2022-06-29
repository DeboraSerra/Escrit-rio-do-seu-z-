const sinon = require('sinon');
const { expect } = require('chai');
const userModel = require('../../models/userModel');
const fs = require('fs/promises');

const mockUsers = require('../mocks/mockUsers');

const user = {
  "email":"harry.potter@hogwarts.uk",
  "password":"Hedwig12!",
  "name":"Harry Potter",
  "id": 3,
}

describe('Testing the user model layer', () => {
  describe('Read user', () => {
    beforeEach(() => {
      sinon.stub(fs, 'readFile').resolves(JSON.stringify(mockUsers));
      sinon.stub(fs, 'writeFile');
    });
    afterEach(() => {
      sinon.restore();
    });
    it('should return an array', async () => {
      const response = await userModel.readUser();
      expect(response).to.be.a('array');
    });
    it('should return an array of objects', async () => {
      const response = await userModel.readUser();
      expect(response).to.be.deep.equal(mockUsers);
    });
  });
  describe('Add user', () => {
    it('should return an array', async () => {
      const response = await userModel.addUser([...mockUsers, user]);
      expect(response).to.be.a('array');
    });
    it('should return the new array with the new user added', async () => {
      const response = await userModel.addUser([...mockUsers, user]);
      expect(response).to.contain(user);
      expect(response[2].id).to.be.equal(3);
    });
  })
})
