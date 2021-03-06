import express from 'express';
import cors from 'cors';
import diagnosisRouter from './routers/diagnosisRouter';
import patientRouter from './routers/patientRouter';

const app = express(); // eslint-disable-next-line @typescript-eslint/no-unsafe-call
app.use(cors()); 
app.use(express.json());

app.get('/api/ping', (_req, res) => {
  res.send('pong');
});

app.use("/api/diagnosis", diagnosisRouter);
app.use("/api/patients", patientRouter);

const PORT = 3001;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});