import React, { useState } from "react";
import Checkbox from "@material-ui/core/Checkbox";
import { Button } from "@material-ui/core";

const CoronaPatient = (props) => {
  const [corona, setCorona] = useState(undefined);
  const [patient, setPatient] = useState({
    lastName: props.patient.lastName,
    firstName: props.patient.firstName,
    birthDate: props.patient.birthDate,
    city: props.patient.city,
    address: props.patient.address,
    patientAmka: props.patient.patientAmka,
    postcode: props.patient.postcode,
    telephone: props.patient.telephone,
    coronaPatient: props.patient._original.coronaPatient,
  });

  const coronaPatientConfrimation = (e) => {
    setCorona(e.target.checked);

    setPatient({ ...patient, [e.target.name]: e.target.checked });
  };

  const handleSave = () => {
    props.updatePatient(patient, props.link);
    setCorona(undefined);
    window.location.reload();
  };

  return (
    <>
      {corona === undefined ? (
        <Checkbox
          name="coronaPatient"
          checked={patient.coronaPatient}
          onClick={coronaPatientConfrimation}
        />
      ) : (
        <>
          <Button onClick={handleSave}>Save</Button>
        </>
      )}
    </>
  );
};

export default CoronaPatient;
