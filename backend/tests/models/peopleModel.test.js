const { expect } = require('chai');
const fs = require('fs/promises');
const sinon = require('sinon');
const peopleMock = require('../mocks/mockPeople');
const peopleModel = require('../../models/peopleModel');
const path = require('path');

const peoplePath = path.resolve('../models', 'pessoas.json');
const inactivePath = path.resolve('../models', './inactivePeople.json');

const person = {
  "id": "be9cfac4-4d72-386a-8912-eed311837405",
  "first_name": "Harry",
  "last_name": "Potter",
  "birthday": "1989-07-31",
  "city": "Little Whinging",
  "email": "harry.potter@hogwarts.com",
  "phone": "+3575676049522",
  "state": "Surrey",
  "address": "Cupboard under the stairs, 4, Privet Drive"
};

describe('Test the model layer for people', () => {
  describe('readPeople', () => {
    beforeEach(() => {
      sinon.stub(fs, 'readFile').returns(JSON.stringify(peopleMock));
      sinon.stub(fs, 'writeFile');
    })
    afterEach(() => {
      sinon.restore();
    })
    it('should return an array', async () => {
      const response = await peopleModel.readPeople();
      expect(response).to.be.a('array');
    });
    it('should return an array of people', async () => {
      const response = await peopleModel.readPeople();
      expect(response).to.be.deep.equal(peopleMock);
    });
  });
  describe('addPeople', () => {
    beforeEach(() => {
      sinon.stub(fs, 'readFile').returns(JSON.stringify(peopleMock));
      sinon.stub(fs, 'writeFile');
    })
    afterEach(() => {
      sinon.restore();
    })
    it('should return an array', async () => {
      const response = await peopleModel.addPeople([...peopleMock, person]);
      expect(response).to.be.a('array');
    });
    it('should return an array of people', async () => {
      const response = await peopleModel.addPeople([...peopleMock, person]);
      expect(response).to.be.deep.equal([...peopleMock, person]);
    });
    it('should return the person added in the array', async () => {
      const response = await peopleModel.addPeople([...peopleMock, person]);
      expect(response).to.be.contain(person);
    });
  });
  describe('deletePerson', () => {
    beforeEach(() => {
      sinon.stub(fs, 'readFile')
        .withArgs(inactivePath).resolves(JSON.stringify([]))
        .withArgs(peoplePath).resolves(JSON.stringify(peopleMock));
      sinon.stub(fs, 'writeFile');
    });
    afterEach(() => {
      sinon.restore();
    });
    it('should return an array', async () => {
      const newPeople = peopleMock.filter((_i, index) => index !== 0);
      const response = await peopleModel.deletePerson(newPeople, peopleMock[0]);
      expect(response).to.be.a('array');
    });
    it('should return an array of people', async () => {
      const newPeople = peopleMock.filter((_i, index) => index !== 0);
      const response = await peopleModel.deletePerson(newPeople, peopleMock[0]);
      expect(response).to.be.deep.equal(newPeople);
    });
    it('should return an array without the person removed', async () => {
      const newPeople = peopleMock.filter((_i, index) => index !== 0);
      const response = await peopleModel.deletePerson(newPeople, peopleMock[0]);
      expect(response).not.to.contain(peopleMock[0]);
    });
  });
});
