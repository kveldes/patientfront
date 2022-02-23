import React, { useEffect, useState } from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Button from "@material-ui/core/Button";
import { Link } from "@material-ui/core";

const Stats = ({ patient }) => {
  const [open, setOpen] = useState(false);
  const [registrationNumber, setRegistrationNumber] = useState(0);
  const [coronaAffected, setCoronaAffected] = useState([]);

  useEffect(() => {
    if (patient.length > 0) {
      setRegistrationNumber(patient.length);
      let tempArr = [];
      patient.forEach((element) => {
        if (element.coronaPatient) {
          tempArr = [...tempArr, element];
        }
      });
      setCoronaAffected(tempArr);
    }
  }, [patient]);

  function percentage() {
    return coronaAffected.length / patient.length * 100;
  }

  // Open the modal form
  const handleClickOpen = () => {
    setOpen(true);
  };

  // Close the modal form
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Link
        variant="outlined"
        color="primary"
        style={{ margin: 10 }}
        onClick={handleClickOpen}
        style={{ cursor: "pointer" }}
      >
        Stats Link
      </Link>
      <Dialog open={open} onClose={handleClose} fullWidth>
        <DialogTitle>Patients Stats</DialogTitle>
        <DialogContent>
          <div>
            <span style={{ display: "flex", alignItems: "center" }}>
              Number Of Registrations:&nbsp;&nbsp;&nbsp;
              <b>{registrationNumber}</b>
            </span>
            <span style={{ display: "flex", alignItems: "center" }}>
              Basic Statistic of corona affected patients:&nbsp;&nbsp;&nbsp;
              <b>{percentage()}%</b>
            </span>
          </div>
        </DialogContent>
        <DialogActions>
          <Button color="secondary" onClick={handleClose}>
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Stats;
