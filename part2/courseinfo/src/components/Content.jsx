import Part from './Part'

const Content = ({parts}) => {
  return (
    <table>
      <thead></thead>
      <tbody>
        {parts.map(part => <Part key={part.id} name={part.name} exercises={part.exercises} />)}
      </tbody>
    </table>
  )
}

export default Content