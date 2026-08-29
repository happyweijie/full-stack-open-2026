const Notification = ({ message, variant }) => {

  if (!message) {
    return null
  }

  return (
    <div>
      {variant}: {message}
    </div>
  )
}

export default Notification
