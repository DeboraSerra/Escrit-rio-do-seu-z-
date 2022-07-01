const { expect } = require('chai');
const sinon = require('sinon');
const peopleService = require('../../services/peopleService');
const peopleController = require('../../controllers/peopleController');
const mockPeople = require('../mocks/mockPeople');

const person = {
  "id": "be9cfac4-4d72-386a-8912-eed311837405",
  "firstName": "Harry",
  "lastName": "Potter",
  "birthday": "1989-07-31",
  "city": "Little Whinging",
  "email": "harry.potter@hogwarts.com",
  "phone": "+3575676049522",
  "state": "Surrey",
  "address": "Cupboard under the stairs, 4, Privet Drive"
};

describe('Test the controller layer for the people', () => {
  describe('readPeople', () => {
    const response = {};
    const request = {};
    beforeEach(() => {
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();
      sinon.stub(peopleService, 'readPeople').resolves(mockPeople);
    });
    afterEach(() => {
      sinon.restore();
    });
    it('returns the status 200', async () => {
      await peopleController.readPeople(request, response);
      expect(response.status.calledWith(200)).to.be.true;
    });
    it('returns the an array of people', async () => {
      await peopleController.readPeople(request, response);
      expect(response.json.calledWith(mockPeople)).to.be.true;
    });
  });
  describe('queryPeople', () => {
    const response = {};
    const request = {};
    beforeEach(() => {
      request.query = {
        q: 'a',
      };
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();
      sinon.stub(peopleService, 'readPeople').resolves(mockPeople);
    });
    afterEach(() => {
      sinon.restore();
    });
    it('returns the status 200', async () => {
      await peopleController.queryPeople(request, response);
      expect(response.status.calledWith(200)).to.be.true;
    });
    it('returns the a new array of people', async () => {
      const newArray = mockPeople.filter((p) => p.first_name.includes('a'));
      await peopleController.queryPeople(request, response);
      expect(response.json.calledWith(newArray)).to.be.true;
    });
  });
  describe('findById', () => {
    const response = {};
    const request = {};
    beforeEach(() => {
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();
      sinon.stub(peopleService, 'readPeople').resolves(mockPeople);
    });
    afterEach(() => {
      sinon.restore();
    });
    it('should return status 404 if the id is invalid', async () => {
      request.params = {
        id: person.id,
      }
      await peopleController.findById(request, response);
      expect(response.status.calledWith(404)).to.be.true;
    });
    it('should return the correct message if the id is invalid', async () => {
      request.params = {
        id: person.id,
      }
      await peopleController.findById(request, response);
      expect(response.json.calledWith({ message: 'person not found' })).to.be.true;
    });
    it('should return status 200 if the id is valid', async () => {
      request.params = {
        id: mockPeople[0].id,
      }
      await peopleController.findById(request, response);
      expect(response.status.calledWith(200)).to.be.true;
    });
    it('should return the correct message if the id is valid', async () => {
      request.params = {
        id: mockPeople[0].id,
      }
      await peopleController.findById(request, response);
      expect(response.json.calledWith(mockPeople[0])).to.be.true;
    });
  });
  describe('addPeople', () => {
    const response = {};
    const request = {};
    beforeEach(() => {
      request.body = person;
      response.status = sinon.stub().returns(response);
      response.end = sinon.stub().returns();
      sinon.stub(peopleService, 'readPeople').resolves(mockPeople);
      sinon.stub(peopleService, 'addPerson');
    });
    afterEach(() => {
      sinon.restore();
    });
    it('should return status 201', async () => {
      await peopleController.addPeople(request, response);
      expect(response.status.calledWith(201)).to.be.true;
    });
    it('should not return data', async () => {
      await peopleController.addPeople(request, response);
      expect(response.end.calledWith()).to.be.true;
    });
  });
  describe('updatePerson', () => {
    const response = {};
    const request = {};
    beforeEach(() => {
      request.params = {
        id: person.id,
      }
      const { id: _id, ...personWithoutId} = person
      request.body = personWithoutId;
      response.status = sinon.stub().returns(response);
      response.end = sinon.stub().returns();
      sinon.stub(peopleService, 'readPeople').resolves(mockPeople);
      sinon.stub(peopleService, 'updatePerson');
    });
    afterEach(() => {
      sinon.restore();
    });
    it('should return status 202', async () => {
      await peopleController.updatePerson(request, response);
      expect(response.status.calledWith(202)).to.be.true;
    });
    it('should not return data', async () => {
      await peopleController.updatePerson(request, response);
      expect(response.end.calledWith()).to.be.true;
    });
  });
  describe('deletePerson', () => {
    const response = {};
    const request = {};
    beforeEach(() => {
      request.params = {
        id: mockPeople[0].id,
      }
      response.status = sinon.stub().returns(response);
      response.end = sinon.stub().returns();
      sinon.stub(peopleService, 'deletePerson');
    });
    afterEach(() => {
      sinon.restore();
    });
    it('should return status 204', async () => {
      await peopleController.deletePerson(request, response);
      expect(response.status.calledWith(204)).to.be.true;
    });
    it('should not return data', async () => {
      await peopleController.deletePerson(request, response);
      expect(response.end.calledWith()).to.be.true;
    });
  });
});
