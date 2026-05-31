const express = require('express');
const app = express();
app.use(express.json());

let persons = [
    { 
      "id": "1",
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": "2",
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": "3",
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": "4",
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
];

// Get all persons
app.get('/api/persons', (req, res) => {
  res.json(persons);
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

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
