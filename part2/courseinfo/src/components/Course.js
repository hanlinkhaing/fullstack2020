import React from "react";

const Header = (props) => (
  <>
    <h1>{props.course}</h1>
  </>
);

const Content = ({parts}) => (
  <>
    {parts.map(part => <Part key={part.id} part={part.name} exercises={part.exercises}/>)}
  </>
);

const Part = (props) => (
  <>
    <p>
      {props.part} {props.exercises}
    </p>
  </>
);

const bold = { fontWeight: "bold" };

const Total = ({ parts }) => {
  const total = parts.reduce((total, current) => {
    total.exercises += current.exercises;
    return total;
  });
  return (
    <>
      <p style={bold}>total of {total.exercises} exercises</p>
    </>
  );
};

const Course = ({ course }) => {
  return (
    <div>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  );
};

export default Course;
