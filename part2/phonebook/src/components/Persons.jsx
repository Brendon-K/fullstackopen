const Persons = ({name, number, remove}) => {
  return (
    <div>
      {name} {number} <button onClick={remove}>remove</button>
    </div>
  )
}

export default Persons