const { Router } = require('express');
const rescue = require('express-rescue');
const peopleController = require('../controllers/peopleController');


const peopleRoute = Router();

peopleRoute.get('/', rescue(peopleController.readPeople));

peopleRoute.get('/search', rescue(peopleController.queryPeople));

peopleRoute.get('/:id', rescue(peopleController.findById));

peopleRoute.post('/', rescue(peopleController.addPeople));

peopleRoute.put('/:id', rescue(peopleController.updatePerson));

peopleRoute.delete('/:id', rescue(peopleController.deletePerson));

module.exports = peopleRoute;
