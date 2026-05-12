import { useState } from 'react'
import Button from './components/Button'
import Statistics from './components/Statistics'

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const increment = (val, setter) => {
    return () => setter(val + 1)
  }

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
