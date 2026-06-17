const swaggerAutogen = require('swagger-autogen')()

// Swagger setup
const doc = {
  info: {
    title: 'Phonebook API',
    description: 'Phonebook API'
  },
  host: 'https://phonebook-io5n.onrender.com'
}

const outputFile = './swagger-output.json'
const routes = ['./index.js']

swaggerAutogen(outputFile, routes, doc)