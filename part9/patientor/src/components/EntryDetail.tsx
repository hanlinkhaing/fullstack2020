import React from 'react';
import { Entry } from '../types';
import HealthCheckEntry from './HealthCheckEntry';
import HosptialEntry from './HospitalEntry';
import OccupationalHealthcareEntry from './OccupationalHealthcareEntry';

interface EntryDetailProps {
  key: string;
  entry: Entry;
}

const EntryDetail: React.FC<EntryDetailProps> = ({ entry }: EntryDetailProps) => {
  const assertNever = (value: never): never => {
    throw new Error(
      `Unhandled discriminated union member: ${JSON.stringify(value)}`
    );
  };

  switch (entry.type) {
    case "Hospital":
      return <HosptialEntry entry={entry}/>;
    case "HealthCheck":
      return <HealthCheckEntry entry={entry}/>;
    case "OccupationalHealthcare":
      return <OccupationalHealthcareEntry entry={entry}/>;
    default: return assertNever(entry);
  }
};

export default EntryDetail;