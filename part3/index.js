
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
const generateId = () => {
  const maxId =  (persons.length > 0
    ? Math.max(...persons.map(p =>Number(p.id)))
    : 0) + 1;

  const randomId = Math.floor(Math.random() * (1_000_000 - maxId) + maxId);
  return String(randomId);
};

app.post('/api/persons', (req, res) => {
  const body = req.body;

  // Check if name or number is missing
  if (!body.name || !body.number) {
    return res.status(400).json({ 
      error: 'Name or number is missing' 
    });
  }

  // Check if name already exists  
  if (persons.some(p => p.name === body.name)) {
    return res.status(400).json({ 
      error: 'Name must be unique' 
    });
  }

  const person = {
    id: generateId(),
    name: body.name,
    number: body.number
  };

  persons = persons.concat(person);
  res.json(person);
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
app.delete('/api/persons/:id', (req, res) => {
  const id = req.params.id;

  if (!persons.some(p => p.id === id)) {
    res.status(404).json({ 
      error: 'Person not found' 
    });   
  }
  
  persons = persons.filter(p => p.id !== id);
  res.status(204).end();
});

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
