import { State } from "./state";
import { Patient, Diagnosis, Entry } from "../types";

export type Action =
  | {
      type: "SET_PATIENT_LIST";
      payload: Patient[];
    }
  | {
      type: "ADD_PATIENT";
      payload: Patient;
    }
  | {
      type: "ADD_PATIENT_DETAIL";
      payload: Patient;
    }
  | {
      type: "SET_DIAGNOSIS_LIST";
      payload: Diagnosis[];
    }
  | {
      type: "ADD_NEW_ENTRY";
      payload: { id: string; entry: Entry };
    };

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "SET_PATIENT_LIST":
      return {
        ...state,
        patients: {
          ...action.payload.reduce(
            (memo, patient) => ({ ...memo, [patient.id]: patient }),
            {}
          ),
          ...state.patients,
        },
      };
    case "ADD_PATIENT":
      return {
        ...state,
        patients: {
          ...state.patients,
          [action.payload.id]: action.payload,
        },
      };
    case "ADD_PATIENT_DETAIL":
      return {
        ...state,
        patientDetails: {
          ...state.patientDetails,
          [action.payload.id]: action.payload,
        },
      };
    case "SET_DIAGNOSIS_LIST":
      return {
        ...state,
        diagnoses: {
          ...action.payload.reduce((memo, diagnosis) => {
            return {
              ...memo,
              [diagnosis.code]: diagnosis,
            };
          }, {}),
        },
      };
    case "ADD_NEW_ENTRY":
      return {
        ...state,
        patientDetails: {
          ...state.patientDetails,
          [action.payload.id]: {
            ...state.patientDetails[action.payload.id],
            entries: state.patientDetails[action.payload.id].entries?.concat(action.payload.entry),
          },
        },
      };
    default:
      return state;
  }
};

export const setPatientList = (patients: Patient[]): Action => {
  return {
    type: "SET_PATIENT_LIST",
    payload: patients,
  };
};

export const addPatient = (patient: Patient): Action => {
  return {
    type: "ADD_PATIENT",
    payload: patient,
  };
};

export const addPatientDetail = (patient: Patient): Action => {
  return {
    type: "ADD_PATIENT_DETAIL",
    payload: patient,
  };
};

export const setDiagnosisList = (diagnoses: Diagnosis[]): Action => {
  return {
    type: "SET_DIAGNOSIS_LIST",
    payload: diagnoses
  };
};

export const addNewEntry = (id: string, entry: Entry): Action => {
  return {
    type: "ADD_NEW_ENTRY",
    payload: {id, entry},
  };
};