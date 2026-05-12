import StatisticLine from "./StatisticsLine"

const Statistics = ({ good, neutral, bad }) => {
  const all = good + neutral + bad
  const score = good - bad

  return (
    <div>
      <h1>statistics</h1>

      {all === 0 
        ? <p>No feedback given</p> 
        : <>
          <StatisticLine label="good" data={good} />
          <StatisticLine label="neutral" data={neutral} />
          <StatisticLine label="bad" data={bad} />
          <StatisticLine label="all" data={all} />
          <StatisticLine label="average" data={score / all} />
          <StatisticLine label="positive" data={good / all * 100} />
        </>
      }
    </div>
  )
}

export default Statistics