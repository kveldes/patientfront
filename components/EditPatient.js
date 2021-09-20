import React, { useState } from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

const EditPatient = (props) => {
    
    const [open, setOpen] = useState(false);
    const [patient, setPatient] = useState({
      lastName: '', firstName: '', birthDate: '', city: '', address: '', patientAmka: '', postcode: '', telephone: '', coronaPatient: ''
  });

  
    const handleClickOpen = () => {
    setPatient({lastName: props.patient.lastName, firstName: props.patient.firstName, birthDate: props.patient.birthDate,
      city: props.patient.city, address: props.patient.address, patientAmka: props.patient.patientAmka,
      postcode: props.patient.postcode,telephone: props.patient.telephone,coronaPatient: props.patient.coronaPatient  })
    setOpen(true);
  }

  const handleClose = () => {
    setOpen(false);
  };
 

  const handleChange = (event) => {
    setPatient({...patient, [event.target.name]: event.target.value});
  }

  // Update patient and close modal form
  const handleSave = () => {
    props.updatePatient(patient, props.link);
    handleClose();
  }

  return (
    <div>
    <Button color="primary" size="small" onClick={handleClickOpen}>Edit</Button>
    <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Edit patient</DialogTitle>
        <DialogContent>
		      <TextField autoFocus fullWidth label="LastName" name="lastName" 
              value={patient.lastName} onChange={handleChange}/> 
			    <TextField autoFocus fullWidth label="FirstName" name="firstName" 
              value={patient.firstName} onChange={handleChange}/> 
			    <TextField autoFocus fullWidth label="BirthDate" name="birthDate" 
              value={patient.birthDate} onChange={handleChange}/> 
          <TextField autoFocus fullWidth label="City" name="city" 
              value={patient.city} onChange={handleChange}/> 
			    <TextField autoFocus fullWidth label="Address" name="address" 
              value={patient.address} onChange={handleChange}/> 
			    <TextField autoFocus fullWidth label="PatientAmka" name="patientAmka" 
              value={patient.patientAmka} onChange={handleChange}/> 
			    <TextField autoFocus fullWidth label="Postcode" name="postcode" 
              value={patient.postcode} onChange={handleChange}/> 
			    <TextField autoFocus fullWidth label="Telephone" name="telephone" 
              value={patient.telephone} onChange={handleChange}/> 
			    <TextField autoFocus fullWidth label="CoronaPatient" name="coronaPatient" 
              value={patient.coronaPatient} onChange={handleChange}/> 
          </DialogContent>  
          <DialogActions>
		           <Button color="secondary" onClick={handleClose}>Cancel</Button>
            <Button color="primary" onClick={handleSave}>Save</Button>
         </DialogActions>
     </Dialog> 
 </div>
);
};

export default EditPatient;