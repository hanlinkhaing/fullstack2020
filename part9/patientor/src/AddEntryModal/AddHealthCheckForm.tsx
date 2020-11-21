import React from "react";
import { Field, Formik, Form } from "formik";
import { TextField, NumberField, DiagnosisSelection } from "../FormField";
import { Grid, Button } from "semantic-ui-react";
import { useStateValue } from "../state";

interface Props {
  onSubmit: (values: any) => void;
  onClose: () => void;
}

const AddHealthCheckForm: React.FC<Props> = ({ onSubmit, onClose }) => {
  const [{ diagnoses }] = useStateValue();

  const isNumber = (value: any): value is number => {
    return typeof value === "number" || value instanceof Number;
  };

  const isDate = (value: any): value is string => {
    return Boolean(Date.parse(value));
  };

  const validateFields = (values: any) => {
    const requiredError = "Field is required";
    const invalidError = "Field is invalid";
    const errors: { [field: string]: string } = {};
    if (!values.description) {
      errors.name = requiredError;
    }

    if (!values.specialist) {
      errors.specialist = requiredError;
    }

    if (!values.date) {
      errors.date = requiredError;
    } else if (!isDate(values.date)) 
      errors.date = invalidError;

    if (!values.healthCheckRating) {
      errors.healthCheckRating = requiredError;
    } else if (!isNumber(values.healthCheckRating)) 
      errors.healthCheckRating = invalidError;
      
    return errors;
  };

  return (
    <Formik
      initialValues={{
        description: "",
        date: "",
        specialist: "",
        type: "HealthCheck",
        diagnosisCodes: [],
        healthCheckRating: "0",
      }}
      onSubmit={onSubmit}
      validate={value => validateFields(value)}
    >
      {({ isValid, dirty, setFieldValue, setFieldTouched }) => {
        return (
          <Form className="form ui">
            <Field
              label="Date"
              placeholder="YYYY-MM-DD"
              name="date"
              component={TextField}
            />
            <Field
              label="Description"
              placeholder="Description"
              name="description"
              component={TextField}
            />
            <Field
              label="Specialist"
              placeholder="Specialist"
              name="specialist"
              component={TextField}
            />
            <DiagnosisSelection
              setFieldValue={setFieldValue}
              setFieldTouched={setFieldTouched}
              diagnoses={Object.values(diagnoses)}
            />
            <Field
              label="Health Check Rating"
              max={3}
              min={0}
              name="healthCheckRating"
              component={NumberField}
            />
            <Grid>
              <Grid.Column floated="left" width={5}>
                <Button type="button" onClick={onClose} color="red">
                  Cancel
                </Button>
              </Grid.Column>
              <Grid.Column floated="right" width={5}>
                <Button
                  type="submit"
                  floated="right"
                  color="green"
                  disabled={!dirty || !isValid}
                >
                  Add
                </Button>
              </Grid.Column>
            </Grid>
          </Form>
        );
      }}
    </Formik>
  );
};

export default AddHealthCheckForm;
