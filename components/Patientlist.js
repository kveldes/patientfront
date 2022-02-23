import React, { Component } from "react";
import { SERVER_URL } from "../constants.js";
import ReactTable from "react-table-6";
import "react-table-6/react-table.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AddPatient from "./AddPatient";
import EditPatient from "./EditPatient";
import Stats from "./Stats";
import { CSVLink } from "react-csv";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import CoronaPatient from "./CoronaPatient";

class Patientlist extends Component {
  constructor(props) {
    super(props);
    this.state = { patients: [] };
  }

  componentDidMount() {
    this.fetchPatients();
  }

  fetchPatients = () => {
    console.log("FETCH");
    fetch(SERVER_URL + "api/patients")
      .then((response) => response.json())
      .then((responseData) => {
        this.setState({
          patients: responseData._embedded.patients,
        });
      })
      .catch((err) => console.error(err));
  };

  // Delete patient
  onDelClick = (link) => {
    if (window.confirm("Are you sure to delete?")) {
      const token = sessionStorage.getItem("jwt");
      fetch(link, {
        method: "DELETE",
        headers: { Authorization: token },
      })
        .then((res) => {
          toast.success("Patient deleted", {
            position: toast.POSITION.BOTTOM_LEFT,
          });
          this.fetchPatients();
        })
        .catch((err) => {
          toast.error("Error when deleting", {
            position: toast.POSITION.BOTTOM_LEFT,
          });
          console.error(err);
        });
    }
  };

  // Add new Patient
  addPatient(patient) {
    const token = sessionStorage.getItem("jwt");
    fetch(SERVER_URL + "api/patients", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
      body: JSON.stringify(patient),
    })
      .then((res) => this.fetchPatients())
      .catch((err) => console.error(err));
  }

  // Update Patient
  updatePatient(patient, link) {
    console.log("patient=================sssss====>", patient);
    // console.log("link=================sssss====>", link);
    const token = sessionStorage.getItem("jwt");
    fetch(link, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
      body: JSON.stringify(patient),
    })
      .then((res) => {
        toast.success("Changes saved", {
          position: toast.POSITION.BOTTOM_LEFT,
        });
        this.fetchPatients();
      })
      .catch((err) => {
        console.log("err===================", err)
        toast.error("Error when saving", {
          position: toast.POSITION.BOTTOM_LEFT,
        });
      });
  }

  // Fetch all patients
  fetchPatients = () => {
    // Read the token from the session storage
    // and include it to Authorization header
    const token = sessionStorage.getItem("jwt");
    fetch(SERVER_URL + "api/patients", {
      headers: { Authorization: token },
    })
      .then((response) => response.json())
      .then((responseData) => {
        this.setState({
          patients: responseData._embedded.patients,
        });
      })
      .catch((err) => console.error(err));
  };

  render() {
    const username = sessionStorage.getItem("username");
    const columns = [
      {
        Header: "LastName",
        accessor: "lastName",
      },
      {
        Header: "FirstName",
        accessor: "firstName",
      },
      {
        Header: "BirthDate",
        accessor: "birthDate",
      },
      {
        Header: "City",
        accessor: "city",
      },
      {
        Header: "Address",
        accessor: "address",
      },
      {
        Header: "PatientAmka",
        accessor: "patientAmka",
      },
      {
        Header: "Postcode",
        accessor: "postcode",
      },
      {
        Header: "Telephone",
        accessor: "telephone",
      },
      {
        Header: "Corona",
        sortable: false,
        filterable: false,
        width: 100,
        accessor: "_links.self.href",
        Cell: ({ value, row }) => {
          return (
            <CoronaPatient
              patient={row}
              updatePatient={this.updatePatient}
              link={value}
            />
          );
        },
      },
      {
        Header: "Edit",
        sortable: false,
        filterable: false,
        width: 100,
        accessor: "_links.self.href",
        Cell: ({ value, row }) => (
          <EditPatient
            patient={row}
            link={value}
            updatePatient={this.updatePatient}
            fetchPatients={this.fetchPatients}
          />
        ),
      },
      {
        Header: "Delete",
        sortable: false,
        filterable: false,
        width: 100,
        accessor: "_links.self.href",
        Cell: ({ value }) => (
          <Button
            size="small"
            color="secondary"
            onClick={() => {
              this.onDelClick(value);
            }}
          >
            Delete
          </Button>
        ),
      },
    ];

    const columnsUser = [
      {
        Header: "LastName",
        accessor: "lastName",
      },
      {
        Header: "FirstName",
        accessor: "firstName",
      },
      {
        Header: "BirthDate",
        accessor: "birthDate",
      },
      {
        Header: "City",
        accessor: "city",
      },
      {
        Header: "Address",
        accessor: "address",
      },
      {
        Header: "PatientAmka",
        accessor: "patientAmka",
      },
      {
        Header: "Postcode",
        accessor: "postcode",
      },
      {
        Header: "Telephone",
        accessor: "telephone",
      },
      {
        Header: "Edit",
        sortable: false,
        filterable: false,
        width: 100,
        accessor: "_links.self.href",
        Cell: ({ value, row }) => (
          <EditPatient
            patient={row}
            link={value}
            updatePatient={this.updatePatient}
            fetchPatients={this.fetchPatients}
          />
        ),
      },
      {
        Header: "Delete",
        sortable: false,
        filterable: false,
        width: 100,
        accessor: "_links.self.href",
        Cell: ({ value }) => (
          <Button
            size="small"
            color="secondary"
            onClick={() => {
              this.onDelClick(value);
            }}
          >
            Delete
          </Button>
        ),
      },
    ];

    return (
      <div className="App">
        <Grid container>
          <Grid item>
            <AddPatient
              addPatient={this.addPatient}
              fetchPatients={this.fetchPatients}
            />
          </Grid>
          <Grid item style={{ padding: 15 }}>
            <CSVLink data={this.state.patients} separator=";">
              Export CSV
            </CSVLink>
          </Grid>
          {username === "admin" ? (
            <Grid item style={{ padding: 15 }}>
              <Stats patient={this.state.patients} />
            </Grid>
          ) : null}
        </Grid>
        <ReactTable
          data={this.state.patients}
          columns={username === "admin" ? columns : columnsUser}
          filterable={true}
        />
        <ToastContainer autoClose={1500} />
      </div>
    );
  }
}

export default Patientlist;
