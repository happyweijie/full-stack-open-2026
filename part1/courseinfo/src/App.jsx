const Header = props => <h1>{props.text}</h1>;

const Content = props => {
  const parts = props.parts;

  return (
    <div>
      <Part name={parts[0].name} count={parts[0].count}/>
      <Part name={parts[1].name} count={parts[1].count}/>
      <Part name={parts[2].name} count={parts[2].count}/>
    </div>
  )
};

const Part = props => <p>{props.name} {props.count}</p>;

const Total = props => {
  const total = props.parts.reduce((sum, part) => sum + part.count, 0);

  return (
    <p>Number of exercises {total}</p>
  );
};

const App = () => {
  const course = 'Half Stack application development'
  const parts = [
    { name: 'Fundamentals of React', count: 10 },
    { name: 'Using props to pass data', count: 7 },
    { name: 'State of a component', count: 14 }
  ]
  
  return (
    <div>
      <Header text={course} />
      <Content parts={parts} />
      <Total parts={parts} />
    </div>
  )
}

export default App
