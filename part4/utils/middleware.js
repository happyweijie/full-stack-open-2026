const logger = require('./logger')
const User = require('../models/user')

const jwt = require('jsonwebtoken')

// middleware for logging the details of the requests
const requestLogger = (request, response, next) => {
  logger.info('Method:', request.method)
  logger.info('Path:  ', request.path)
  logger.info('Body:  ', request.body)
  logger.info('---')
  next()
}

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

const errorHandler = (error, request, response, next) => {
  logger.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).send({ error: error.message })
  } else if (error.name === 'MongoServerError'
      && error.message.includes('E11000 duplicate key error')) {
    return response.status(400)
      .send({ error: 'expected `username` to be unique' })
  } else if (error.name === 'JsonWebTokenError') {
    return response.status(401)
      .json({ error: 'invalid token' })
  } else if (error.name === 'TokenExpiredError') {
    return response.status(401)
      .json({ error: 'token expired' })
  }

  next(error)
}

const tokenExtractor = (request, response, next) => {
  const auth = request.get('authorization')

  // Strict backend middleware (case-insensitivity not allowed)
  if (auth && auth.startsWith('Bearer ')) {
    request.token = auth.replace('Bearer ', '')
  } else {
    request.token = null
  }

  next()
}

/**
 * Middleware to extract user object from json web token.
 * Note: This middleware should only be registered in routes
 * which require authenticated requests.
 * 
 * @param {*} request 
 * @param {*} response 
 * @param {*} next 
 * @returns 
 */
const userExtractor = async (request, response, next) => {
  const decodedUserToken = jwt.verify(request.token, process.env.SECRET)
  
  // Get user object from decoded token
  const user = await User.findById(decodedUserToken.id)
  if (!user) {
    return response.status(400)
      .json({ error: 'token missing or not valid' })
  }

  // inject user into token
  request.user = user
  next()
}

module.exports = {
  requestLogger,
  unknownEndpoint,
  errorHandler,
  tokenExtractor,
  userExtractor
}