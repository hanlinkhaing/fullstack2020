import React from "react";
import { EntryProp } from "../types";
import { Card, Icon } from "semantic-ui-react";

const OccupationalHealthcareEntry: React.FC<EntryProp> = ({ entry }: EntryProp) => {
  return (
    <Card fluid>
      <Card.Content>
        <Card.Header>{`${entry.date} `}<Icon name="stethoscope" /></Card.Header>
        <Card.Meta>{entry.description}</Card.Meta>
      </Card.Content>
    </Card>
  );
};

export default OccupationalHealthcareEntry;
