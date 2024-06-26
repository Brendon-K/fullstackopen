import { useState } from 'react'

const Display = ({text}) => {
  return (
    <div>
      <p>{text}</p>
    </div>
  )
}

const DisplayVotes = ({votes}) => {
  return (
    <div>
      <p>has {votes} votes</p>
    </div>
  )
}

const Button = ({onClick, text}) => {
  return (
    <button onClick={onClick}>
      {text}
    </button>
  )
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]
   
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(new Array(anecdotes.length).fill(0))

  const best_anecdote = anecdotes[votes.indexOf(Math.max(...votes))]

  const nextAnecdote = () => {
    let next = Math.floor(Math.random() * anecdotes.length)
    setSelected(next)
  }

  const vote = () => {
    const new_votes = [...votes]
    ++new_votes[selected]
    setVotes(new_votes)
  }

  return (
    <div>
      <h1>Anecdote of the day</h1>
      <Display text={anecdotes[selected]} />
      <DisplayVotes votes={votes[selected]} />
      <Button onClick={vote} text="vote" />
      <Button onClick={nextAnecdote} text="next anecdote" />
      <h1>Anecdote with most votes</h1>
      <Display text={best_anecdote} />
    </div>
  )
}

export default App