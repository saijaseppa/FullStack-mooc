

const Header = (props) => {
  return (
    <div>
      <h1>{props.course}</h1>
    </div>
  )
}

const Part = (props) => {

  return (
    <div>
      <p>{props.name} {props.count}</p>
    </div>
  )
    

}

const Content = (content) => {
  return (
    <div>
      <Part name={content.content.first} count={content.content.exe1}/>
      <Part name={content.content.seco} count={content.content.exe2}/>
      <Part name={content.content.third} count={content.content.exe3} />
    </div>
  )
}

const Total = (total) => {
  return (
    <div>
      <p>Number of exercises {total.total}</p>
    </div>
  )
}

const App = () => {
  const course = 'Half Stack application development'
  const part1 = 'Fundamentals of React'
  const exercises1 = 10
  const part2 = 'Using props to pass data'
  const exercises2 = 7
  const part3 = 'State of a component'
  const exercises3 = 14

  const content = {
    first: part1,
    exe1: exercises1,
    seco: part2,
    exe2: exercises2,
    third: part3,
    exe3: exercises3
  }

  const total = exercises1+exercises2+exercises3;

  return (
    <div>
      <Header course={course} />
      <Content content={content} />
      <Total total={total} />
    </div>
  )
}

export default App;
