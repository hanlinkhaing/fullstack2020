/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import express from 'express';
import patientService from '../services/patientService';
import { Entry } from '../uitilities/types';
import { toPatientWithoutId, toEntryWithoutId } from '../uitilities/utils';

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

router.get('/:id', (req, res) => {
  const patient = patientService.getPatientById(req.params.id);
  if (patient) res.json(patient);
  else res.status(404).send({ error: "Patient not found!" });
});

router.post('/:id/entries', (req, res) => {
 try {
   const entry: Entry = toEntryWithoutId(req.body);
   const savedEntry: Entry = patientService.addEntry(req.params.id, entry);
   console.log(savedEntry);
   res.status(201).json(savedEntry);
 } catch (e) {
   console.log(e);
   res.status(400).send({ error: e.message });
 }
});

export default router;