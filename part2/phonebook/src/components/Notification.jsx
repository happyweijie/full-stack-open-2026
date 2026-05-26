const Notification = ({ message }) => {
  const baseStyle = {
    borderStyle: 'solid',
    borderRadius: '5px',
    padding: '10px',
    marginBottom: '10px'
  }

  const successStyle = {
    color: 'green',
    backgroundColor: 'lightgrey',
    ...baseStyle
  }

  if (message === null) {
    return null
  }

  return (
    <div style={successStyle}>
      {message}
    </div>
  )
}

export default Notification
