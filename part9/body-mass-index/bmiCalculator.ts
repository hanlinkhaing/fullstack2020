export const calculateBmi = (height: number, weight: number): string => {
  const heightInCM = height / 100;
  const result = weight / (heightInCM * heightInCM);
  switch (true) {
    case result <= 15:
      return "Very severely underweight";
    case result > 15 && result <= 16:
      return "Severely underweight";
    case result > 16 && result <= 18.5:
      return "Underweight";
    case result > 18.5 && result <= 25:
      return "Normal (healthy weight)";
    case result > 25 && result <= 30:
      return "Overweight";
    case result > 30 && result <= 35:
      return "Obese Class I (Moderately obese)";
    case result > 35 && result <= 40:
      return "Obese Class II (Severely obese)";
    case result > 40:
      return "Obese Class III (Very severely obese)";
    default:
      return "Invalid Weight";
  }
};

export const isValidValues = (height: string, weight: string): boolean => {
  if (!isNaN(Number(height)) && !isNaN(Number(weight))) {
    return true;
  } else return false;
};

const validateArgs = (): Array<number> => {
  if (process.argv.length < 4) throw new Error("not enough arguements");
  if (process.argv.length > 4) throw new Error("too many arguements");

  const [arg1, arg2, ...args] = process.argv;
  arg1;
  arg2;
  if (!isNaN(Number(args[0])) && !isNaN(Number(args[1]))) {
    return [Number(args[0]), Number(args[0])];
  } else throw new Error("invalid arguemnts");
};

try {
  const arguements = validateArgs();
  console.log(calculateBmi(arguements[0], arguements[1]));
} catch (e) {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  console.log("Error, something bad happened, message: ", e.message);
}