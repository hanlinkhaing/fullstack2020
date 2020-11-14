/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import patients from '../../data/patients';
import { PatientWithoutSSN, Patient, PatientWithoutId } from '../uitilities/types';
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

export default {
  getPatientWithoutSSN,
  addNewPatient,
};