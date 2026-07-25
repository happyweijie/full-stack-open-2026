const info = (...parms) => {
  if (process.env.NODE_ENV !== 'test') {
    console.log('[INFO]: ', ...parms)
  }
}

const error = (...params) => {
  if (process.env.NODE_ENV !== 'test') {
    console.error('[ERROR]: ', ...params)
  }
}

module.exports = {
  info,
  error
}