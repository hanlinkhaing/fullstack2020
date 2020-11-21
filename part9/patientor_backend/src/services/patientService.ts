/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import { PatientWithoutSSN, Patient, PatientWithoutId, Entry } from '../uitilities/types';
import patients from './patients';
import { v1 as uuid } from 'uuid';

const getPatientWithoutSSN = (): PatientWithoutSSN[] => {
  return patients.map(({id, name, dateOfBirth, gender, occupation}) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation
  }));
};

const addNewPatient = (reqPatient: PatientWithoutId): Patient => {
  const newPatient: Patient = {
    id: uuid(),
    ...reqPatient,
  };
  patients.push(newPatient);
  return newPatient;
};

const getPatientById = (id: string): Patient | undefined => {
  let patient = patients.find((p) => p.id == id);
  if (patient) 
    patient = {
      ...patient
    };

  return patient;
};

const addEntry = (id: string, entry: Entry): Entry => {
  patients.forEach((p) => {
    if (p.id === id) {
      entry = { ...entry, id: uuid() };
      p.entries.push(entry);
    }
  });

  return entry;
};

export default {
  getPatientWithoutSSN,
  addNewPatient,
  getPatientById,
  addEntry
};