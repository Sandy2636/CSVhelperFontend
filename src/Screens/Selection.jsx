import { Button } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import "./selection.scss";

function Selection() {
  return (
    <div className="selection">
      <Link to="/first">
        <Button>First</Button>
      </Link>
      <Link to="/second">
        <Button>Second</Button>
      </Link>
    </div>
  );
}

export default Selection;
