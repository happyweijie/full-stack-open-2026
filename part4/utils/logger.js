const info = (...parms) => {
  console.log('[INFO]: ', ...parms)
}

const error = (...params) => {
  console.error('[ERROR]: ', ...params)
}

module.exports = {
  info,
  error
}