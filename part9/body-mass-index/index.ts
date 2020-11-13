/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import express from 'express';
import { calculateBmi, isValidValues } from './bmiCalculator';
import { calculateExercises, getFormattedValues, Arguements } from './exerciseCalculator';

const app = express();

app.use(express.json());

app.get("/hello", (_req, res) => {
    res.send('Hello Full Stack');
});

app.get("/bmi", (req, res) => {
    const height = String(req.query.height);
    const weight = String(req.query.weight);

    if (!isValidValues(height, weight)) 
        res.status(400).send({error:'invalid values'});
    else {
        const result: string = calculateBmi(Number(height), Number(weight));
        res.send({ height, weight, bmi: result });
    }
});

app.post("/exercises", (req, res) => {
    const { daily_exercises, target } = req.body;
    if (!(daily_exercises instanceof Array)) res.status(400).send({ error: 'malformatted parameters' });
    else {
        try {
            const args: Arguements = getFormattedValues(daily_exercises, target);
            res.status(200).send(calculateExercises(args));
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        } catch(e) { res.status(400).send({ error: e.message }); }
    }
});

const PORT = 3003;

app.listen(PORT, () => {
    console.log(`Server already started at ${PORT}`);
});