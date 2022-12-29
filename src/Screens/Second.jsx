import { Button, Typography } from "@mui/material";
import axios from "axios";
import React, { useState } from "react";
import { JsonToTable } from "react-json-to-table";
import "./second.scss";
function Second() {
  const [file, setFile] = useState();
  const [jsonData, setJsonData] = useState({});
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUploadFile = async () => {
    let formdata = new FormData();
    formdata.append("CSV", file);
    // const res = await axios.post(
    //   "http://localhost:8800/api/user/upload",
    //   formdata
    // );
    const res = await axios({
      method: "POST",
      url: "http://localhost:8800/api/user/upload/",
      data: formdata,
      headers: {},
    });
    if (res.data.success) {
      setJsonData(res.data.data);
    }
  };
  return (
    <div className="container">
      <div className="upload">
        <div className="head">
          <Typography variant="h4">Upload the File</Typography>
        </div>
        <div className="body">
          <input onChange={handleFileChange} type="file" name="CSV" />
          <div className="btnHolder">
            <Button onClick={handleUploadFile}>Upload</Button>
          </div>
        </div>
      </div>
      <div className="table">
        <div className="body">
          <JsonToTable json={jsonData} />
        </div>
      </div>
    </div>
  );
}

export default Second;
