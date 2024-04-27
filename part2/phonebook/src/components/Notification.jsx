const Notification = ({message}) => {
  if (message === null) {
    return null
  }

  const notificationStyle = {
    color: 'green',
    fontSize: '20px',
    borderStyle: 'solid',
    borderRadius: '5px',
    padding: '10px',
    marginBottom: '10px'
  }

  return (
    <div style={notificationStyle}>
      <p>{message}</p>
    </div>
  )
}

export default Notification