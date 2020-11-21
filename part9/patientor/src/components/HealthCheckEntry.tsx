import React from "react";
import { HealthCheckEntry } from "../types";
import { Card, Icon } from "semantic-ui-react";

interface HealthCheckEntryProps {
  entry: HealthCheckEntry;
}

const HealthCheck: React.FC<HealthCheckEntryProps> = ({ entry }: HealthCheckEntryProps) => {
  const getHealthColor = () => {
    switch (entry.healthCheckRating) {
      case 0:
        return "green";
      case 1:
        return "yellow";
      case 2:
        return "red";
      default:
        return "purple";
    }
  };

  return (
    <Card fluid>
      <Card.Content>
        <Card.Header>
          {`${entry.date} `}
          <Icon name="doctor" />
        </Card.Header>
        <Card.Meta>{entry.description}</Card.Meta>
        <Card.Description>
          <Icon name="heart" color={getHealthColor()} />
        </Card.Description>
      </Card.Content>
    </Card>
  );
};

export default HealthCheck;
