const { readPeople, addPeople, updatePerson } = require('../readPeople');
const fs = require('fs/promises');
const sinon = require('sinon');
const mockPeople = require('./mockPeople');
const { expect } = require('chai');

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
  
})
