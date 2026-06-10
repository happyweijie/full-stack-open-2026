
require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const Person = require('./modules/person');

const app = express();

morgan.token('body', (req, res) => JSON.stringify(req['body']));
app.use(express.json());
app.use(express.static('dist'));
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'));

// Get all persons
app.get('/api/persons', (req, res) => {
  Person.find({})
    .then((persons) => res.json(persons));
});

// Add person
app.post('/api/persons', (req, res) => {
  const body = req.body;

  // Check if name or number is missing
  if (!body.name || !body.number) {
    return res.status(400).json({ 
      error: 'Name or number is missing' 
    });
  }

  const person = new Person({
    name: body.name,
    number: body.number
  });

  person.save()
    .then((savedPerson) => {
      res.json(savedPerson);
    });
});

// Info page
app.get('/info', (req, res) => {
  const time = new Date();

  res.send(`
    <p>Phonebook has info for ${persons.length} people</p>

    <p>${time}</p>
    `);
});

// Get a single person by ID
app.get('/api/persons/:id', (req, res) => {
  const id = req.params.id;
  const person = persons.find(p => p.id === id);
  
  if (!person) {
    res.status(404).json({ 
      error: 'Person not found' 
    });  
  }
    
  res.json(person);
});

// Delete person
app.delete('/api/persons/:id', (req, res, next) => {
  Person.findByIdAndDelete(req.params.id)
    .then(result => res.status(204).end())
    .catch(error => next(error));
});

// error handler
const errorHandler = (error, req, res, next) => {
  console.log(error.message);

  if (error.name === 'CastError') {
    return res.status(400).send({ error: 'malformatted id' })
  }
  
  next(error);
}

// middleware for unknown endpoint
const unknownEndpoint = (req, res) => {
  res.status(404).send({ error: 'unknown endpoint' });
};

app.use(unknownEndpoint);
app.use(errorHandler);

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
