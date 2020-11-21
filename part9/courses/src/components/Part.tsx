import React from 'react';
import { CoursePart } from '../types';

interface PartProps {
  key: number;
  part: CoursePart;
}
const Part: React.FC<PartProps> = ({ part }) => {
  const assertNever = (value: never): never => {
    throw new Error(
      `Unhandled discriminated union member: ${JSON.stringify(value)}`
    );
  };

  switch (part.name) {
    case "Fundamentals":
      return (
        <div>
          <p>name: {part.name}</p>
          <p>exerciseCount: {part.exerciseCount}</p>
          <p>description: {part.description}</p>
          <p>____________________________</p>
        </div>
      );
    case "Using props to pass data":
      return (
        <div>
          <p>name: {part.name}</p>
          <p>exerciseCount: {part.exerciseCount}</p>
          <p>groupProjectCount: {part.groupProjectCount}</p>
          <p>____________________________</p>
        </div>
      );
    case "Deeper type usage":
      return (
        <div>
          <p>name: {part.name}</p>
          <p>exerciseCount: {part.exerciseCount}</p>
          <p>description: {part.description}</p>
          <p>exerciseSubmissionLink: {part.exerciseSubmissionLink}</p>
          <p>____________________________</p>
        </div>
      );
    case "Test type usage":
      return (
        <div>
          <p>name: {part.name}</p>
          <p>exerciseCount: {part.exerciseCount}</p>
          <p>description: {part.description}</p>
          <p>totalHour: {part.totalHour}</p>
          <p>____________________________</p>
        </div>
      );
    default:
      return assertNever(part);
  }
};

export default Part;