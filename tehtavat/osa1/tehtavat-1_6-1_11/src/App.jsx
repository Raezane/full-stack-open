import { useState } from 'react'

const Button = ({ onClick, text }) => (
  <button onClick={onClick}>{text}</button>
)

const StatisticLine = (props) => {
  return (
    <tr>
      <td>{props.text}</td>
      <td>{props.value}</td>
    </tr>
  )
}

const Statistics = (props) => {

  if (props.inputs.length === 0) {
    return (
      <div>
        <p>No feedback given</p>
      </div>
    )
  } 

  let average = props.inputs.reduce((a, b) => a + b, 0) / props.inputs.length
  let positives = (props.good / props.inputs.length) * 100 + ' %'

  return (
    <div>
      <table>
        <tbody>
          <StatisticLine text="good" value={props.good}/>
          <StatisticLine text="neutral" value={props.neutral}/>
          <StatisticLine text="bad" value={props.bad}/>
          <StatisticLine text="total" value={props.good + props.neutral + props.bad}/>
          <StatisticLine text="average" value={average}/>
          <StatisticLine text="positive" value={positives} />
        </tbody>
      </table>
    </div>
  )
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [inputs, setInputs] = useState([])

  const handleGoodClick = () => {
    setGood(good + 1)
    setInputs(inputs.concat(1))
  }

  const handleNeutralClick = () => {
    setNeutral(neutral + 1)
    setInputs(inputs.concat(0))
  }

  const handleBadClick = () => {
    setBad(bad + 1)
    setInputs(inputs.concat(-1))
  } 

  return (
    <div>
      <h1>give feedback</h1>
      <Button onClick={handleGoodClick} text='good'/>
      <Button onClick={handleNeutralClick} text='neutral'/>
      <Button onClick={handleBadClick} text='bad'/>
      <h1>statistics</h1>
      <Statistics good={good} neutral={neutral} bad={bad} inputs={inputs}/>
    </div>
  )
}

export default App