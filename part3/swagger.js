const swaggerAutogen = require('swagger-autogen')()

// Swagger setup
const doc = {
  info: {
    title: 'Phonebook API',
    description: 'Phonebook API'
  },
  host: 'phonebook-io5n.onrender.com',
  schemes: ['https'],
  consumes: ['application/json'],
  produces: ['application/json'],
}

const outputFile = './swagger-output.json'
const routes = ['./index.js']

swaggerAutogen(outputFile, routes, doc)