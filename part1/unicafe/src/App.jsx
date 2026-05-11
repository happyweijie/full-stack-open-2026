import { useState } from 'react'
import Button from './Button'

const increment = (val, setter) => {
  return () => setter(val + 1)
}

const StatsDisplay = ({ label, data }) => <p>{label} {data}</p>

const App = () => {
  const [good, setGood] = useState(0)
  const g = "good"
  const [neutral, setNeutral] = useState(0)
  const n = "neutral"
  const [bad, setBad] = useState(0)
  const b = "bad"

  return (
    <div>
      <h1>give feedback</h1>
      <Button text={g} onClick={increment(good, setGood)}/>
      <Button text={n} onClick={increment(neutral, setNeutral)}/>
      <Button text={b} onClick={increment(bad, setBad)}/>

      <h1>statistics</h1>
      <StatsDisplay label={g} data={good} />
      <StatsDisplay label={n} data={neutral} />
      <StatsDisplay label={b} data={bad} />
    </div>
  )
}

export default App
