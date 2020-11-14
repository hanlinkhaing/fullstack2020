import diagnoses from '../../data/diagnoses';
import { Diagnose } from '../uitilities/types';

const getDiagnoses = (): Array<Diagnose> => {
  return diagnoses;
};

export default {
  getDiagnoses,
};