import { useState } from "react";

const Button = ({ handleClick, text }) => {
  return (
    <button onClick={handleClick}>{text}</button>
  )
}

const App = () => {

  const [ good, setGood ] = useState(0);
  const [ neutral, setNeutral ] = useState(0);
  const [ bad, setBad ] = useState(0);

  const addGood = () => {
    setGood(good+1);
  }

  return (
    <div>
      <h1>give feedback</h1>
      <Button handleClick={() => addGood()} text="good"/>
    </div>
  )
}

export default App;
