import React from "react";
import axios from "axios";
import { useParams } from "react-router";
import { apiBaseUrl } from "../constants";
import { Patient, Gender, Diagnosis } from "../types";
import { useStateValue, addPatientDetail, setDiagnosisList } from "../state";

import { Icon, Button } from "semantic-ui-react";
import EntryDetail from '../components/EntryDetail';
import AddEntryModal from '../AddEntryModal';

const PatientDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [{ patientDetails, diagnoses }, dispatch] = useStateValue();
  //const [patient, setPatient] = React.useState<Patient>(patientDetails[id] || {} as Patient);

  const getPatientDetail = async () => {
    const result = await axios.get<Patient>(`${apiBaseUrl}/patients/${id}`);
    if (result.data) {
      dispatch(addPatientDetail(result.data));
      //setPatient(result.data);
    } else console.log(result);
  };

  const getDiagnoses = async () => {
    const result = await axios.get<Diagnosis[]>(`${apiBaseUrl}/diagnosis`);
    if (result.data) {
      dispatch(setDiagnosisList(result.data));
    } else console.log(result);
  };

  const [modalOpen, setModalOpen] = React.useState<boolean>(false);

  const openModal = (): void => setModalOpen(true);

  const closeModal = (): void => {
    setModalOpen(false);
  };

  React.useEffect(() => {
    //const patientDetail = patientDetails[id];
    //if (!patientDetail) setPatient(patientDetail);
    if (!patientDetails[id]) getPatientDetail();

    if (!Object.keys(diagnoses).length) getDiagnoses();
  }, [dispatch]);

  if(!patientDetails[id]) return <div>Loading...</div>;

  return (
    <div>
      <h2>
        {patientDetails[id].name}
        {patientDetails[id].gender === Gender.Male ? (
          <Icon name="mars" />
        ) : patientDetails[id].gender === Gender.Female ? (
          <Icon name="venus" />
        ) : (
          <Icon name="genderless" />
        )}
      </h2>
      <p>ssn: {patientDetails[id].ssn}</p>
      <p>occupation: {patientDetails[id].occupation}</p>
      <h4>entries</h4>
      {patientDetails[id].entries?.map((entry) => {
        return (
          <EntryDetail key={entry.id} entry={entry} />
        );
      })}
      <AddEntryModal
        modalOpen={modalOpen}
        patientId={patientDetails[id].id}
        onClose={closeModal}
      />
      <Button onClick={() => openModal()}>Add New Entry</Button>
    </div>
  );
};

export default PatientDetailPage;
