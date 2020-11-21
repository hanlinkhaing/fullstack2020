export enum Gender {
  Male = 'male',
  Female = 'female',
  Other = 'other',
}

export interface Diagnose {
  code: string;
  name: string;
  latin?: string;
}

// export interface Entry {

// }

export interface BaseEntry {
  id: string;
  description: string;
  date: string;
  specialist: string;
  diagnosisCodes?: Array<Diagnose['code']>;
}

export enum HealthCheckRating {
  "Healthy" = 0,
  "LowRisk" = 1,
  "HighRisk" = 2,
  "CriticalRisk" = 3,
}

export interface HealthCheckEntry extends BaseEntry {
  type: "HealthCheck";
  healthCheckRating: HealthCheckRating;
}

interface Discharge {
  date: string;
  criteria: string;
}

export interface HospitalEntry extends BaseEntry {
  type: "Hospital";
  discharge: Discharge;
}

interface SickLeave {
  startDate: string;
  endDate: string;
}

export interface OccupationalHealthcareEntry extends BaseEntry {
  type: "OccupationalHealthcare";
  employerName: string;
  sickLeave?: SickLeave;
}

export type Entry =
  | HospitalEntry
  | OccupationalHealthcareEntry
  | HealthCheckEntry;

export interface Patient {
  id: string;
  name: string;
  dateOfBirth: string;
  ssn: string;
  gender: Gender;
  occupation: string;
  entries: Entry[];
}

export type PatientWithoutSSN = Omit<Patient, 'ssn' | 'entries'>;

export type PatientWithoutId = Omit<Patient, "id">;

export type PublicPatient = Omit<Patient, "ssn" | "entries">;

export type EntryWithoutId = Omit<Entry, 'id'>;

export type HealthCheckEntryWithoutId = Omit<HealthCheckEntry, 'id'>;

export type HospitalEntryWithoutId = Omit<HospitalEntry, 'id'>;

export type OccupationalHealthcareEntryWithoutId = Omit<OccupationalHealthcareEntry, 'id'>;