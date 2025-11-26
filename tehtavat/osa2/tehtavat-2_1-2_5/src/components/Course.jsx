const Header = ({name}) => (
  <h2>
    {name}
  </h2>
);

const Content = ({parts}) => (
  <div>
    {parts.map(part => (
      <Part key={part.id} name={part.name} exercises={part.exercises}/>
    ))}
  </div>
);

const Part = (props) => {
  return (
  <p>
    {props.name} {props.exercises}
  </p>
  )
}

const Total = (props) => {
  return (
  <div>
    <b>total of {props.parts.reduce((sum, part) => sum + part.exercises, 0)} exercises</b>
  </div> 
  )
}

const Course = (props) => {
  const courses = props.courses
  return (
  <>
      {courses.map(course => 
        <div key={course.id}>
          <h1>Web development curriculum</h1>
          <Header name={course.name} />
          <Content parts={course.parts} />
          <Total parts={course.parts}/> 
        </div>
      )}
  </>
  )
}

export default Course