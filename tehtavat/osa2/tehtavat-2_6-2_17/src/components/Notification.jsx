const Notification = ({ message }) => {

  const notificationStyle = {
    color: 'green',
    background: 'lightgrey',
    fontSize: '20px',
    borderStyle: 'solid',
    borderRadius: '5px',
    padding: '10px',
    marginBottom: '10px'
  }

  if (message === null) {
    return null
  }

  if (message.includes('has already been removed from the server')) notificationStyle.color = 'red'

  return (
    <div style={notificationStyle}>
      {message}
    </div>
  )
}

export default Notification