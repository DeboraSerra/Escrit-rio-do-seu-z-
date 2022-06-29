const { expect } = require('chai');
const sinon = require('sinon');
const userModel = require('../../models/userModel');
const userService = require('../../services/userService');
const mockUser = require('../mocks/mockUsers');

const user = {
  "email":"tryber@tryber.com",
  "password":"trybe12!",
  "name":"Tryber",
  "id": 2,
}

const notAUser = {
  "email":"harry.potter@hogwarts.uk",
  "password":"Hedwig12!",
  "name":"Harry Potter",
  "id": 3,
}

describe('Test the service layer for the user', () => {
  describe('readUser', () => {
    beforeEach(() => {
      sinon.stub(userModel, 'readUser').resolves(mockUser);
    });
    afterEach(() => {
      sinon.restore();
    });
    it('returns an array', async () => {
      const response = await userService.readUser();
      expect(response).to.be.a('array');
    });
    it('returns an array of people', async () => {
      const response = await userService.readUser();
      expect(response).to.be.deep.equal(mockUser);
    });
  });
  describe('addUser', () => {
    beforeEach(() => {
      sinon.stub(userModel, 'readUser').resolves(mockUser);
      sinon.stub(userModel, 'addUser');
    });
    afterEach(() => {
      sinon.restore();
    });
    it('returns true if the user is created successfully', async () => {
      const response = await userService.addUser(notAUser);
      expect(response).to.be.true;
    });
    it('throws an error if the user already exists', async () => {
      try {
        await userService.addUser(user);
      } catch (e) {
        expect(e.message).to.be.equal('User already exists');
      }
    });
  });
});
