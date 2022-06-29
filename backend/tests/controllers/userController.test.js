const { expect } = require('chai');
const sinon = require('sinon');
const userService = require('../../services/userService');
const userController = require('../../controllers/userController');
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

describe('Test the controller layer for the user', () => {
  describe('getUser', () => {
    const response = {};
    const request = {};
    beforeEach(() => {
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();
      sinon.stub(userService, 'readUser').resolves(mockUser);
    });
    afterEach(() => {
      sinon.restore();
    });
    it('should return status 403 if the user doesn\'t exists', async () => {
      request.body = notAUser;
      await userController.getUser(request, response);
      expect(response.status.calledWith(403)).to.be.true;
    });
    it('should return a message if the user doesn\'t exist', async () => {
      request.body = notAUser;
      await userController.getUser(request, response);
      expect(response.json.calledWith({ message: 'wrong email or password' }));
    });
    it('should return status 403 if the password is wrong', async () => {
      request.body = { ...user, password: '12345a!' };
      await userController.getUser(request, response);
      expect(response.status.calledWith(403)).to.be.true;
    });
    it('should return a message if the password is wrong', async () => {
      request.body = { ...user, password: '12345a!' };
      await userController.getUser(request, response);
      expect(response.json.calledWith({ message: 'wrong email or password' }));
    });
    it('should return the status 200 if the info are correct', async () => {
      request.body = user;
      await userController.getUser(request, response);
      expect(response.status.calledWith(200)).to.be.true;
    });
  });
  describe('validateUser', () => {
    const response = {};
    const request = {};
    beforeEach(() => {
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();
      sinon.stub(userService, 'readUser').resolves(mockUser);
    });
    afterEach(() => {
      sinon.restore();
    });
    it('returns status 400 if any of the info are missing', async () => {
      request.body = { ...notAUser, name: '' };
      await userController.validateUser(request, response);
      expect(response.status.calledWith(400)).to.be.true;

      request.body = { ...notAUser, email: '' };
      await userController.validateUser(request, response);
      expect(response.status.calledWith(400)).to.be.true;

      request.body = { ...notAUser, password: '' };
      await userController.validateUser(request, response);
      expect(response.status.calledWith(400)).to.be.true;
    });
    it('returns the correct message if any info is missing', async () => {
      request.body = { ...notAUser, name: '' };
      await userController.validateUser(request, response);
      expect(response.json.calledWith({ message: 'name is required' })).to.be.true;

      request.body = { ...notAUser, email: '' };
      await userController.validateUser(request, response);
      expect(response.json.calledWith({ message: 'email is required' })).to.be.true;

      request.body = { ...notAUser, password: '' };
      await userController.validateUser(request, response);
      expect(response.json.calledWith({ message: 'password is required' })).to.be.true;
    });
    it('returns a message if the email or password is in the wrong format', async () => {
      request.body = { ...notAUser, email: 'trybe@' };
      await userController.validateUser(request, response);
      expect(response.json.calledWith({ message: 'invalid email' })).to.be.true;

      request.body = { ...notAUser, password: '12345' };
      await userController.validateUser(request, response);
      expect(response.json.calledWith({ message: 'invalid password' })).to.be.true;
    });
  });
  describe('addUser', () => {
    const response = {};
    const request = {};
    beforeEach(() => {
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();
      sinon.stub(userService, 'readUser').resolves(mockUser);
      sinon.stub(userService, 'addUser');
    });
    afterEach(() => {
      sinon.restore();
    });
    it('returns the status 201 when the user is created', async () => {
      request.body = notAUser;
      await userController.addUser(request, response);
      expect(response.status.calledWith(201)).to.be.true;
    });
    it('returns a message when the user iis created', async () => {
      request.body = notAUser;
      await userController.addUser(request, response);
      expect(response.json.calledWith({ message: 'User created' })).to.be.true;
    })
  })
});
