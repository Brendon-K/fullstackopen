import { useState } from 'react'

const StatisticLine = ({text, value, percentage}) => {
  let isPercentage = (percentage === 'true')
  let percent_sign = isPercentage ? '%' : ''
  return (
    <tr>
      <td>
        {text}
      </td>
      <td>
        {value} {percent_sign}
      </td>
    </tr>
  )
}

const Statistics = ({good, neutral, bad}) => {
  if (good === 0 && neutral === 0 && bad === 0) {
    return (
      <div>
        <p>No feedback given</p>
      </div>
    )
  }  

  const all = good+neutral+bad
  const average = (1*good - 1*bad)/all
  const percent_positive = good / all

  return (
    <div>
      <table>
        <thead></thead>
        <tbody>
          <StatisticLine text="good" value={good} />
          <StatisticLine text="neutral" value={neutral} />
          <StatisticLine text="bad" value={bad} />
          <StatisticLine text="all" value={all} />
          <StatisticLine text="average" value={average} />
          <StatisticLine text="postive" value={percent_positive} percentage="true" />
        </tbody>
      </table>
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
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const goodFeedback = () => {
    setGood(good+1)
  }

  const neutralFeedback = () => {
    setNeutral(neutral+1)
  }

  const badFeedback = () => {
    setBad(bad+1)
  }

  return (
    <div>
      <h1>give feedback</h1>
      <Button onClick={goodFeedback} text="good" />
      <Button onClick={neutralFeedback} text="neutral" />
      <Button onClick={badFeedback} text="bad" />
      <h1>statistics</h1>
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

export default App