import React, { useState } from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Checkbox from "@material-ui/core/Checkbox";

const AddPatient = (props) => {
  const username = sessionStorage.getItem("username");
  const [open, setOpen] = useState(false);
  const [patient, setPatient] = useState({
    lastName: "",
    firstName: "",
    birthDate: "",
    city: "",
    address: "",
    patientAmka: "",
    postcode: "",
    telephone: "",
    coronaPatient: "",
  });

  // Open the modal form
  const handleClickOpen = () => {
    setOpen(true);
  };

  // Close the modal form
  const handleClose = () => { 
    setOpen(false);
  };

  const handleChange = (event) => {
    setPatient({ ...patient, [event.target.name]: event.target.value });
  };

  // Save patient and close modal form
  const handleSave = () => {
    props.addPatient(patient);
    handleClose();
  };

  return (
    <div>
      <Button
        variant="outlined"
        color="primary"
        style={{ margin: 10 }}
        onClick={handleClickOpen}
      >
        New Patient
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>New patient</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            fullWidth
            label="LastName"
            name="lastName"
            value={patient.lastName}
            onChange={handleChange}
          />
          <TextField
            autoFocus
            fullWidth
            label="FirstName"
            name="firstName"
            value={patient.firstName}
            onChange={handleChange}
          />
          <TextField
            autoFocus
            fullWidth
            label="BirthDate"
            name="birthDate"
            value={patient.birthDate}
            onChange={handleChange}
          />
          <TextField
            autoFocus
            fullWidth
            label="City"
            name="city"
            value={patient.city}
            onChange={handleChange}
          />
          <TextField
            autoFocus
            fullWidth
            label="Address"
            name="address"
            value={patient.address}
            onChange={handleChange}
          />
          <TextField
            autoFocus
            fullWidth
            label="PatientAmka"
            name="patientAmka"
            value={patient.patientAmka}
            onChange={handleChange}
          />
          <TextField
            autoFocus
            fullWidth
            label="Postcode"
            name="postcode"
            value={patient.postcode}
            onChange={handleChange}
          />
          <TextField
            autoFocus
            fullWidth
            label="Telephone"
            name="telephone"
            value={patient.telephone}
            onChange={handleChange}
          />
          {username === "admin" ? <span>
            Corona Affected? <Checkbox name="coronaPatient" onChange={(e) => setPatient({ ...patient, "coronaPatient": e.target.checked })} />
          </span> : null}
        </DialogContent>
        <DialogActions>
          <Button color="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button color="primary" onClick={handleSave}>
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default AddPatient;
