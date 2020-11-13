import express from 'express';
import { calculateBmi, isValidValues } from './bmiCalculator';

const app = express();

app.get("/hello", (_req, res) => {
    res.send('Hello Full Stack')
})

app.get("/bmi", (req, res) => {
    let height = String(req.query.height)
    let weight = String(req.query.weight)

    if (!isValidValues(height, weight)) 
        res.status(400).send({error:'invalid values'})
    else {
        let result: string = calculateBmi(Number(height), Number(weight))
        res.send({ height, weight, bmi: result })
    }
})

const PORT = 3003

app.listen(PORT, () => {
    console.log(`Server already started at ${PORT}`)
})