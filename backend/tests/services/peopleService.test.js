const { expect } = require('chai');
const sinon = require('sinon');
const peopleModel = require('../../models/peopleModel');
const peopleService = require('../../services/peopleService');
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

describe('Test the service layer for the people route', () => {
  describe('readPeople', () => {
    beforeEach(() => {
      sinon.stub(peopleModel, 'readPeople').resolves(mockPeople);
    });
    afterEach(() => {
      sinon.restore();
    });
    it('returns an array', async () => {
      const response = await peopleService.readPeople();
      expect(response).to.be.a('array');
    });
    it('returns an array of people', async () => {
      const response = await peopleService.readPeople();
      expect(response).to.be.deep.equal(mockPeople);
    });
  });
  describe('addPerson', () => {
    beforeEach(() => {
      sinon.stub(peopleModel, 'readPeople').resolves(mockPeople);
      sinon.stub(peopleModel, 'addPeople');
    });
    afterEach(() => {
      sinon.restore();
    });
    it('should throw an error if the firstName is empty', async () => {
      const { firstName: _firstName, ...invalidPerson } = person;
      try {
        await peopleService.addPerson(invalidPerson);
      } catch (e) {
        expect(e.message).to.be.equal('Invalid name')
      }
    });
    it('should throw an error if the lastName is empty', async () => {
      const { lastName: _lastName, ...invalidPerson } = person;
      try {
        await peopleService.addPerson(invalidPerson);
      } catch (e) {
        expect(e.message).to.be.equal('Invalid name')
      }
    });
    it('throws an error if the birthday is empty', async () => {
      const { birthday: _birthday, ...invalidPerson } = person;
      try {
        await peopleService.addPerson(invalidPerson);
      } catch (e) {
        expect(e.message).to.be.equal('Invalid birthday');
      }
    });
    it('throws an error if the birthday is in a different format', async () => {
      const newPerson = { ...person, birthday: '31-07-1989' };
      try {
        await peopleService.addPerson(newPerson);
      } catch (e) {
        expect(e.message).to.be.equal('Invalid birthday');
      }
    });
    it('throws an error if the email is empty', async () => {
      const { email: _email, ...invalidPerson } = person;
      try {
        await peopleService.addPerson(invalidPerson);
      } catch (e) {
        expect(e.message).to.be.equal('Invalid email');
      }
    });
    it('throws an error if the email is in a different format', async () => {
      const newPerson = { ...person, email: '31-07-1989' };
      try {
        await peopleService.addPerson(newPerson);
      } catch (e) {
        expect(e.message).to.be.equal('Invalid email');
      }
    });
    it('return true if the person is added successfully', async () => {
      const response = await peopleService.addPerson(person);
      expect(response).to.be.true;
    });
  });
  describe('updatePerson', () => {
    beforeEach(() => {
      sinon.stub(peopleModel, 'readPeople').resolves(mockPeople);
      sinon.stub(peopleModel, 'addPeople');
    });
    afterEach(() => {
      sinon.restore();
    });
    it('should throw an error if the firstName is empty', async () => {
      const { firstName: _firstName, ...invalidPerson } = person;
      try {
        await peopleService.updatePerson(invalidPerson);
      } catch (e) {
        expect(e.message).to.be.equal('Invalid name')
      }
    });
    it('should throw an error if the lastName is empty', async () => {
      const { lastName: _lastName, ...invalidPerson } = person;
      try {
        await peopleService.updatePerson(invalidPerson);
      } catch (e) {
        expect(e.message).to.be.equal('Invalid name')
      }
    });
    it('throws an error if the birthday is empty', async () => {
      const { birthday: _birthday, ...invalidPerson } = person;
      try {
        await peopleService.updatePerson(invalidPerson);
      } catch (e) {
        expect(e.message).to.be.equal('Invalid birthday');
      }
    });
    it('throws an error if the birthday is in a different format', async () => {
      const newPerson = { ...person, birthday: '31-07-1989' };
      try {
        await peopleService.updatePerson(newPerson);
      } catch (e) {
        expect(e.message).to.be.equal('Invalid birthday');
      }
    });
    it('throws an error if the email is empty', async () => {
      const { email: _email, ...invalidPerson } = person;
      try {
        await peopleService.updatePerson(invalidPerson);
      } catch (e) {
        expect(e.message).to.be.equal('Invalid email');
      }
    });
    it('throws an error if the email is in a different format', async () => {
      const newPerson = { ...person, email: 'invalid@' };
      try {
        await peopleService.updatePerson(newPerson);
      } catch (e) {
        expect(e.message).to.be.equal('Invalid email');
      }
    });
    it('return true if the person is added successfully', async () => {
      const response = await peopleService.updatePerson(person);
      expect(response).to.be.true;
    });
  });
  describe('deletePeople', () => {
    beforeEach(() => {
      sinon.stub(peopleModel, 'readPeople').resolves(mockPeople);
      sinon.stub(peopleModel, 'addPeople');
      sinon.stub(peopleModel, 'deletePerson');
    });
    afterEach(() => {
      sinon.restore();
    });
    it('throws an error if the id is invalid', async () => {
      try {
        await peopleService.deletePerson(person);
      } catch (e) {
        expect(e.message).to.be.equal('Person not found');
      }
    });
    it('returns true if the person exists', async () => {
      const response = await peopleService.deletePerson(person.id);
      expect(response).to.be.true;
    });
  });
});
