const Total = ({exercises}) => {
  const sum = exercises.reduce((a, b) => a+b, 0)

  return (
    <tr>
      <td>
        <b>total exercises</b>
      </td>
      <td>
        <b>{sum}</b>
      </td>
    </tr>
  )
}

export default Total