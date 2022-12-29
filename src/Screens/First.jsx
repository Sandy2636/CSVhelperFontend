import { Autocomplete, Button, TextField, Typography } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { countries } from "../Utility/country";
import "./first.scss";
import Swal from "sweetalert2/dist/sweetalert2.js";
import "sweetalert2/src/sweetalert2.scss";
import { DataGrid } from "@mui/x-data-grid";
import { generateCSV } from "../Utility/generateCSV";
function First() {
  const [user, setUser] = useState({
    name: "",
    email: "",
    dob: "",
    country: "",
    address: "",
  });
  const [errText, setErrText] = useState({
    name: "",
    email: "",
    dob: "",
    country: "",
    address: "",
  });
  const [isError, setIsError] = useState(false);
  const [tableData, setTableData] = useState([]);

  const createUser = async () => {
    const res = await axios.post("http://localhost:8800/api/user/", user);
    if (res.data.success) {
      Swal.fire({
        icon: "success",
        text: "User Created Successfully",
      });
      setUser({
        name: "",
        email: "",
        dob: "",
        country: "",
        address: "",
      });
      getUsers();
    } else {
      Swal.fire({
        icon: "error",
        text: "Error Occured",
      });
    }
  };

  const getUsers = async () => {
    const res = await axios.get(" http://localhost:8800/api/user/");

    if (res.data.success) {
      setTableData(res.data.data);
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  const handleNameChange = (e) => {
    setUser({ ...user, name: e.target.value });
  };
  const handleCountryChange = (e, newValue) => {
    setUser({ ...user, country: newValue });
  };
  const handleAddressChange = (e) => {
    setUser({ ...user, address: e.target.value });
  };
  const handleDOBChange = (e) => {
    setUser({ ...user, dob: e.target.value });
  };
  const handleEmailChange = (e) => {
    setUser({ ...user, email: e.target.value });
  };
  console.log("Users :", tableData);
  const handleSubmitClicked = () => {
    switch ("") {
      case user.name:
        setIsError(true);
        setErrText({ name: "Please Enter Name" });
        return;
      case user.email:
        setIsError(true);
        setErrText({ email: "Please Enter Email" });
        return;

      case user.address:
        setIsError(true);
        setErrText({ address: "Please Enter Address" });
        return;
      case user.country:
        setIsError(true);
        setErrText({ country: "Please Enter Country" });
        return;
      default:
        setErrText({
          name: "",
          email: "",
          dob: "",
          country: "",
          address: "",
        });
        break;
    }

    let pattern =
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!pattern.test(user.email)) {
      setIsError(true);
      setErrText({ email: "Invalid Email" });
      return;
    }
    createUser();
  };

  console.log("user :", user);
  console.log("tableDta :", tableData);
  return (
    <div className="container">
      <div className="form">
        <div className="head">
          <Typography variant="h4">User Details</Typography>
        </div>
        <div className="body">
          <div className="inputHolder">
            <TextField
              style={{ width: "100%" }}
              label="Name"
              name="name"
              value={user.name}
              onChange={handleNameChange}
              helperText={errText.name}
            />
          </div>
          <div className="inputHolder">
            <TextField
              style={{ width: "100%" }}
              label="Email"
              name="email"
              onChange={handleEmailChange}
              value={user.email}
              helperText={errText.email}
            />
          </div>
          <div className="inputHolder">
            <TextField
              style={{ width: "100%" }}
              label="Date of Birth"
              name="dob"
              onChange={handleDOBChange}
              value={user.dob}
              helperText={errText.dob}
            />
          </div>
          <div className="inputHolder">
            <TextField
              style={{ width: "100%" }}
              label="Address"
              name="address"
              onChange={handleAddressChange}
              value={user.address}
              helperText={errText.address}
            />
          </div>
          <div className="inputHolder">
            {/* <TextField label="Country" name="country" value={user.country} /> */}
            <Autocomplete
              options={countries.map((i) => i.name)}
              value={user.country}
              getOptionLabel={(option) => option}
              onChange={handleCountryChange}
              renderInput={(params) => (
                <TextField
                  {...params}
                  style={{ width: "100%" }}
                  label="Country"
                  helperText={errText.country}
                />
              )}
            />
          </div>
          <div className="btnHolder">
            <Button onClick={handleSubmitClicked}>Submit</Button>
          </div>
        </div>
      </div>
      <div className="table">
        <div className="head">
          <Typography variant="h4">Users Table</Typography>
        </div>
        <div className="bodys">
          <DataGrid
            columns={[
              {
                field: "name",
                headerName: "Name",
                width: 150,
                editable: true,
              },
              {
                field: "email",
                headerName: "Email",
                width: 150,
                editable: true,
              },
              {
                field: "dob",
                headerName: "Date of Birth",
                width: 110,
                editable: true,
              },
              {
                field: "address",
                headerName: "Address",
                editable: true,
                width: 260,
              },
              {
                field: "country",
                headerName: "Country",
                editable: true,
                width: 160,
              },
            ]}
            pageSize={5}
            getRowId={(i) => i._id}
            rows={tableData}
            autoHeight
            rowsPerPageOptions={[5]}
          />
          <div className="btnHolder">
            <Button
              onClick={generateCSV(
                [
                  {
                    field: "name",
                    label: "Name",
                    width: 150,
                    editable: true,
                  },
                  {
                    field: "email",
                    label: "Email",
                    width: 150,
                    editable: true,
                  },
                  {
                    field: "dob",
                    label: "Date of Birth",
                    width: 110,
                    editable: true,
                  },
                  {
                    field: "address",
                    label: "Address",
                    editable: true,
                    width: 260,
                  },
                  {
                    field: "country",
                    label: "Country",
                    editable: true,
                    width: 160,
                  },
                ],
                tableData,
                "UserCSV"
              )}
            >
              Export
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default First;
