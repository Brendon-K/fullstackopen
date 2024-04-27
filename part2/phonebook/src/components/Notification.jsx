const Notification = ({message, type}) => {
  if (message === null) {
    return null
  }

  const messageStyle = {
    color: 'green',
    fontSize: '20px',
    borderStyle: 'solid',
    borderRadius: '5px',
    padding: '10px',
    marginBottom: '10px'
  }

  const errorStyle = {
    color: 'red',
    fontSize: '20px',
    borderStyle: 'solid',
    borderRadius: '5px',
    padding: '10px',
    marginBottom: '10px'
  }

  const styleType = type === 'message' ? messageStyle : errorStyle

  return (
    <div style={styleType}>
      <p>{message}</p>
    </div>
  )
}

export default Notification