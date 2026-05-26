const Notification = ({ message, variant }) => {
  const baseStyle = {
    backgroundColor: 'lightgrey',
    borderStyle: 'solid',
    borderRadius: '5px',
    padding: '10px',
    marginBottom: '10px'
  }

  const successStyle = {
    color: 'green',
    ...baseStyle
  }

  const errorStyle = {
    color: 'red',
    ...baseStyle
  }

  if (message === null) {
    return null
  }

  const displayStyle = variant === 'success' 
    ? successStyle 
    : errorStyle

  return (
    <div style={displayStyle}>
      {message}
    </div>
  )
}

export default Notification
