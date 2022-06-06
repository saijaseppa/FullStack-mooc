import { useState } from "react";

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when dianosing patients.'
  ]
   
  const [selected, setSelected] = useState(0)
  const [ votes, setVotes ] = useState(new Uint8Array(7));

  const handleClick = () => {
    setSelected(Math.floor(Math.random() * 7));
    //console.log(votes);
  }

  const vote = () => {
    console.log(votes);
    const copy = [...votes];
    copy[selected] += 1;
    setVotes(copy);
    console.log(votes);
  }

  const Title = ({ text }) => <h1>{text}</h1>

  const MostVotedAnecdote = ({ anecdotes, votes}) => {
    //Setting the first value in votes as biggest and checkin table through to get the biggest number out
    let biggest = votes[0];
    let index = 0;
    for (let i= 0; i<votes.length; i++) {
      if (votes[i] > biggest) {
        biggest = votes[i];
        index = i;
      }
    }

    return (
      <div>
        <p>{anecdotes[index]}</p>
        <p>has {biggest} votes</p>
      </div>
    )
  }

  return (
    <div>
      <Title text="Anecdote of the day" />
      {anecdotes[selected]}
      <p>has {votes[selected]} votes</p>
      <br />
      <button onClick={vote}>vote</button>
      <button onClick={handleClick}>next anecdote</button>
      <Title text="Anecdote with most votes" />
      <MostVotedAnecdote anecdotes={anecdotes} votes={votes} />
    </div>
  )
}

export default App;
