const StatisticLine = ({ label, data }) => {
  return (
    <tr>
      <td>{label}</td>
      <td>{data}</td>
    </tr>
  )
}

export default StatisticLine