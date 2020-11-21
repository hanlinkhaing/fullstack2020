/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { Gender, PatientWithoutId, HealthCheckEntry, HospitalEntry, OccupationalHealthcareEntry, Entry } from './types';

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
    entries: []
  };
};

export const toEntryWithoutId = (obj: any): Entry => {
  if (!obj.type) throw new Error(`Invalid Entry: ${obj}`);
  else {
    if (!isString(obj.description))
      throw new Error(`Invalid Description: ${obj.description}`);
    if (!isDate(obj.date)) throw new Error(`Invalid Date: ${obj.date}`);
    if (!isString(obj.specialist))
      throw new Error(`Invalid Specialist: ${obj.specialist}`);
    if (obj.diagnosisCodes)
      obj.diagnosisCodes.forEach((dia: any) => {
        if (!isString(dia)) throw new Error(`Invalid Diagnosis: ${dia}`);
    });

    switch (obj.type) {
      case 'HealthCheck': return checkHealthCheckType(obj);
      case 'Hospital': return checkHospitalCheckType(obj);
      case 'OccupationalHealthcare': return checkOccupationalType(obj);
      default: throw new Error(`Invalid Type: ${obj.type}`);
    }
  }
};

const checkHealthCheckType = (obj: any): HealthCheckEntry => {
  if (!isNumber(obj.healthCheckRating))
    throw new Error(`Invalid HealthCheckRating: ${obj.healthCheckRating}`);
  return {
    id: "",
    date: obj.date,
    description: obj.description,
    specialist: obj.specialist,
    type: obj.type,
    diagnosisCodes: obj.diagnosisCodes,
    healthCheckRating: Number(obj.healthCheckRating),
  };
};

const checkHospitalCheckType = (obj: any): HospitalEntry => {
  if (!isDate(obj.discharge.date))
    throw new Error(`Invalid Discharge Date: ${obj.discharge.date}`);
  if (!isString(obj.discharge.criteria))
    throw new Error(`Invalid Discharge Criteria: ${obj.discharge.criteria}`);
  return {
    id: "",
    date: obj.date,
    description: obj.description,
    specialist: obj.specialist,
    type: obj.type,
    diagnosisCodes: obj.diagnosisCodes,
    discharge: obj.discharge,
  };
};

const checkOccupationalType = (obj: any): OccupationalHealthcareEntry => {
  if (!isString(obj.employerName))
    throw new Error(`Invalid Employer Name: ${obj.employerName}`);
  if (obj.sickLeave) {
    if (!isDate(obj.sickLeave.startDate))
      throw new Error(`Invalid startDate: ${obj.sickLeave.startDate}`);
    if (!isDate(obj.sickLeave.endDate))
      throw new Error(`Invalid endDate: ${obj.sickLeave.endDate}`);
  }
  return {
    id: '',
    date: obj.date,
    description: obj.description,
    specialist: obj.specialist,
    type: obj.type,
    diagnosisCodes: obj.diagnosisCodes,
    employerName: obj.employerName,
    sickLeave: obj.sickLeave,
  };
};

const isString = (value: any): value is string => {
  return typeof value === 'string' || value instanceof String;
};

const isNumber = (value: any): value is number => {
  return typeof value === "number" || value instanceof Number;
};

const isDate = (value: any): value is string => {
  return Boolean(Date.parse(value));
};

const isGender = (value: any): value is Gender => {
  return Object.values(Gender).includes(value);
};