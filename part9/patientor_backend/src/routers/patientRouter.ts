/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import express from 'express';
import patientService from '../services/patientService';
import { toPatientWithoutId } from '../uitilities/utils';

const router = express.Router();

router.get('/', (_req, res) => {
  res.send(patientService.getPatientWithoutSSN());
});

router.post('/', (req, res) => {
  try {
    const newPatient = patientService.addNewPatient(toPatientWithoutId(req.body));
    res.json(newPatient);
  } catch(e) {
    res.status(400).send({ error: e.message });
  }
});

export default router;