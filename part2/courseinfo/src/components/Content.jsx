import Part from './Part'
import Total from './Total'

const Content = ({parts}) => {
  const exercises = parts.map(part => part.exercises)
  return (
    <table>
      <thead></thead>
      <tbody>
        {parts.map(part => <Part key={part.id} name={part.name} exercises={part.exercises} />)}
        <Total exercises={exercises}/>
      </tbody>
    </table>
  )
}

export default Content