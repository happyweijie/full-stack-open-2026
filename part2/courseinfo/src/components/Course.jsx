const Course = ({ course }) => (
	<div>
    <Header text={course.name} />
    <Content parts={course.parts} />
    <Total parts={course.parts} />
  </div>
)

const Header = ({ text }) => <h2>{text}</h2>;

const Content = ({ parts }) => {
  return (
    <div>
      {parts.map(part => {
        return <Part key={part.id} name={part.name} exercises={part.exercises} />
      })}
    </div>
  )
};

const Part = ({ name, exercises }) => <p>{name} {exercises}</p>

const Total = ({ parts }) => (
    <b>
      total of {parts.reduce((sum, part) => sum + part.exercises, 0)} exercises
    </b>
  );

export default Course;