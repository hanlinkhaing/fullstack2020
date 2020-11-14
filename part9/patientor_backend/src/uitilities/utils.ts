/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { Gender, PatientWithoutId } from './types';

export const toPatientWithoutId = (obj: any): PatientWithoutId => {
  if (!isString(obj.name)) throw new Error(`Invalid Name: ${obj.name}`);
  if (!isDate(obj.dateOfBirth)) throw new Error(`Invalid Date of Birth: ${obj.dateOfBirth}`);
  if (!isString(obj.ssn)) throw new Error(`Invalid SSN: ${obj.ssn}`);
  if (!isGender(obj.gender)) throw new Error(`Invalid Gender: ${obj.gender}`);
  if (!isString(obj.occupation)) throw new Error(`Invalid Occupation: ${obj.occupation}`);
  return {
    name: obj.name,
    dateOfBirth: obj.dateOfBirth,
    ssn: obj.ssn,
    gender: obj.gender,
    occupation: obj.occupation,
  };
};

const isString = (value: any): value is string => {
  return typeof value === 'string' || value instanceof String;
};

const isDate = (value: any): value is string => {
  return Boolean(Date.parse(value));
};

const isGender = (value: any): value is Gender => {
  return Object.values(Gender).includes(value);
};