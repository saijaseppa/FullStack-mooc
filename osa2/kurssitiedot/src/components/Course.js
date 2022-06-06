

const Header = ({ text }) => {
    return (
      <div>
        <h1>{text}</h1>
      </div>
    )
  }
  
  const Part = ({ part }) => {
    //console.log("part: ", part);
    return (
      <div>
        <p>{part.name} {part.exercises}</p>
      </div>
    )
  }
  
  const Content = ({ parts }) => {
    //console.log("content ", parts);
    return (
      <div>
        {parts.map(part =>
          <Part key={part.id} part={part} />)}
      </div>
    )
  }
  
  const Total = ({ parts }) => {
    //console.log(parts)
    /*const total = parts.reduce((sum, part) => {
      console.log("sum: ", sum)
      console.log("part.exercises count: ", part.exercises);
      return sum + part.exercises}, 0);*/
  
    const total = parts.reduce((sum, part) => sum + part.exercises, 0);
  
    return (
      <div>
        <p>Total of {total} exercises</p>
      </div>
    )
  }


const Course = ({ course }) => {

    return (
      <div>
        <Header text={course.name} />
        <Content parts={course.parts} />
        <Total parts={course.parts} />
      </div>
  
    )
  }
  
  export default Course