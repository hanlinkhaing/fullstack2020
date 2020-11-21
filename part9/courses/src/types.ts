interface CoursePartBase {
  name: string;
  exerciseCount: number;
}

interface CoursePartZero extends CoursePartBase {
  description: string;
}

export interface CoursePartOne extends CoursePartZero {
  name: "Fundamentals";
}

export interface CoursePartTwo extends CoursePartBase {
  name: "Using props to pass data";
  groupProjectCount: number;
}

export interface CoursePartThree extends CoursePartZero {
  name: "Deeper type usage";
  exerciseSubmissionLink: string;
}

export interface CoursePartFour extends CoursePartZero {
  name: "Test type usage";
  totalHour: number;
}

export type CoursePart = CoursePartOne | CoursePartTwo | CoursePartThree | CoursePartFour;
