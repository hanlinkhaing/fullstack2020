interface ResultObj {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

export interface Arguements {
  trainings: Array<number>;
  target: number;
}

export const calculateExercises = ({ trainings, target }: Arguements): ResultObj => {
  const resultObj: ResultObj = {} as ResultObj;
  resultObj.periodLength = trainings.length;
  resultObj.trainingDays = trainings.filter((t) => t > 0).length;
  resultObj.average =
    trainings.reduce((total, t) => total + t) / resultObj.periodLength;
  resultObj.success = resultObj.average >= target;
  resultObj.target = target;
  const ratingOnEach: Array<number> = trainings.map((t) =>
    t > target ? 3 : (t === target ? 2 : 1)
  );
  resultObj.rating = Math.round(
    ratingOnEach.reduce((total, t) => total + t) / ratingOnEach.length
  );
  switch (resultObj.rating) {
    case 1:
      resultObj.ratingDescription = "bad, train more";
      break;
    case 2:
      resultObj.ratingDescription = "not too bad but could be better";
      break;
    default:
      resultObj.ratingDescription = "good, better than target";
      break;
  }
  return resultObj;
};

export const getFormattedValues = (trainings: Array<number>, target: number): Arguements => {
  const returnObj: Arguements = {} as Arguements;

  if (!isNaN(Number(target))) returnObj.target = Number(target);
  else throw new Error("malformatted parameters");

  if (trainings.length < 1) throw new Error("parameters missing");

  try {
    returnObj.trainings = trainings.map((t) => {
      if (!isNaN(Number(t))) return Number(t);
      else throw new Error("malformatted parameters");
    });
  } catch (e) {
    throw new Error("malformatted parameters");
  }

  return returnObj;
};

const getArguements = (): Arguements => {
  if (process.argv.length < 4) throw new Error("not enough arguements");

  const [arg1, arg2, target, ...trainings] = process.argv;
  arg1;
  arg2;
  const returnObj: Arguements = {} as Arguements;

  if (!isNaN(Number(target))) returnObj.target = Number(target);
  else throw new Error("invalid arguements");

  try {
    returnObj.trainings = trainings.map((t) => {
      if (!isNaN(Number(t))) return Number(t);
      else throw new Error("invalid arguements");
    });
  } catch (e) {
    throw new Error("invalid arguements");
  }

  return returnObj;
};

try {
  console.log(calculateExercises(getArguements()));
} catch (e) {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  console.log("Error, something bad happened, message: ", e.message);
}
