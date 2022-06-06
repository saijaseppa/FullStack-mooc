import { useState } from "react";

const Title = ({ text }) => <div><h1>{text}</h1></div>

const Button = ({ handleClick, text }) => {
  return (
    <button onClick={handleClick}>{text}</button>
  )
}

const Statistics = ({ good, neutral, bad }) => {
  if (good === 0 && neutral === 0 && bad === 0) return <p>No feedback given</p>
  else {
    return (
      <table>
        <tbody>
          <tr><StatisticLine text="good" value={good} /></tr>
          <tr><StatisticLine text="neutral" value={neutral} /></tr>
          <tr><StatisticLine text="bad" value={bad} /></tr>
          <tr><StatisticLine text="all" value={good + neutral + bad} /></tr>
          <tr><StatisticLine text="average" value={(good - bad) / (good + neutral + bad)} /></tr>
          <tr><StatisticLine text="positive" value={good / (good + neutral + bad) * 100} /></tr>
        </tbody>
      </table>
    )
  }
}

const StatisticLine = ({ text, value }) => {
  if (text === "positive") return <td>{text} {value} %</td>
  else {
    return (
      <td>{text} {value}</td>
    )
  }
}


const App = () => {

  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const addGood = () => setGood(good + 1);
  const addNeutral = () => setNeutral(neutral + 1);
  const addBad = () => setBad(bad + 1)

  return (
    <div>
      <Title text="give feedback" />

      <Button handleClick={() => addGood()} text="good" />
      <Button handleClick={() => addNeutral()} text="neutral" />
      <Button handleClick={() => addBad()} text="bad" />

      <Title text="statistics" />

      <Statistics good={good} neutral={neutral} bad={bad} />



    </div>
  )
}

export default App;
