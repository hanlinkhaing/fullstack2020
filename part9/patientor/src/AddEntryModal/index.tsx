import React from "react";
import axios from 'axios';
import { Modal, Segment, Dropdown } from "semantic-ui-react";
import AddHealthCheckForm from './AddHealthCheckForm';
import { apiBaseUrl } from '../constants';
import { useStateValue, addNewEntry } from '../state';

interface Props {
  modalOpen: boolean;
  onClose: () => void;
  patientId: string;
}

const AddEntryModal = ({ modalOpen, onClose, patientId }: Props) => {

  const [ type, setType ] = React.useState<string>();
  const [ error, setError ] = React.useState<string>('');
  const [ , dispatch ] = useStateValue();

  const submitNewEntry = async (values: any) => {
    try {
      const { data } = await axios.post(
        `${apiBaseUrl}/patients/${patientId}/entries`,
        values
      );
      dispatch(addNewEntry(patientId, data));
      setType('');
      onClose();
    } catch (e) {
      console.error(e.response.data);
      setError(e.response.data.error);
    }
  };

  const typeOption = [
    {
      text: "Hospital",
      value: "Hospital",
    },
    {
      text: "OccupationalHealthcare",
      value: "OccupationalHealthcare",
    },
    {
      text: "HealthCheck",
      value: "HealthCheck",
    },
  ];

  const getForm = () => {
    switch (type) {
      case 'HealthCheck': return <AddHealthCheckForm onSubmit={submitNewEntry} onClose={onClose}/>;
      case 'Hospital': return <AddHealthCheckForm onSubmit={submitNewEntry} onClose={onClose} />;
      case 'OccupationalHealthcare': return <AddHealthCheckForm onSubmit={submitNewEntry} onClose={onClose} />;
    }
  };

  return (
    <Modal open={modalOpen} onClose={onClose} centered={false} closeIcon>
      <Modal.Header>Add a new entry</Modal.Header>
      <Modal.Content>
        {error && <Segment inverted color="red">{`Error: ${error}`}</Segment>}
        <Dropdown  placeholder="Select Type" fluid selection options={typeOption} 
          onChange={(event, data) => setType(data.value?.toString())}/>
        {getForm()}
      </Modal.Content>
    </Modal>
  );
};

export default AddEntryModal;
