import { useState } from 'react'
import Button from './Button'

const increment = (val, setter) => {
  return () => setter(val + 1)
}

const score = (good, neutral, bad) => good - bad

const StatsDisplay = ({ label, data }) => <p>{label} {data}</p>

const Statistics = ({ good, neutral, bad }) => {
  const all = good + neutral + bad

  return (
    <div>
      <h1>statistics</h1>
      <StatsDisplay label="good" data={good} />
      <StatsDisplay label="neutral" data={neutral} />
      <StatsDisplay label="bad" data={bad} />
      <StatsDisplay label="all" data={all} />
      <StatsDisplay label="average" data={score(good, neutral, bad) / all} />
      <StatsDisplay label="positive" data={good / all * 100} />
    </div>
  )
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <h1>give feedback</h1>
      <Button text="good" onClick={increment(good, setGood)} />
      <Button text="neutral" onClick={increment(neutral, setNeutral)} />
      <Button text="bad" onClick={increment(bad, setBad)} />

      <Statistics good={good} neutral={neutral} bad={bad} />  
    </div>
  )
}

export default App
