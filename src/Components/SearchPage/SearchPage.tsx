import React, { useState } from "react";
import "./SearchPage.scss";
import { TextField, Button } from "@mui/material";
import SearchResults from "../SearchResults/SearchResults";
import { Paper } from "@mui/material";
export default function SearchPage() {
  const [value, setValue] = useState("");
  const [rollno, setRollno] = useState("");
  const [err, setErr] = useState("");
  const rollnoHandler = (val: string) => {
    if (val.length < 6) {
      setErr("It is atleast of length 6");
      return;
    }
    if (!containsOnlyNumbers(value)) {
      console.log("here");
      setErr("Dont waste your time");
      return;
    }
    if (val[1] !== "9") {
      setErr("Oops! We are still scraping data, We will produce to you soon!");
      return;
    }
    setErr("");
    setRollno(value);
  };
  return (
    <div className="search-page">
      <div>
        <TextField
          id="outlined-basic"
          label="Roll no."
          variant="outlined"
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
          }}
        />
        <br />
        <Button onClick={rollnoHandler.bind(null, value)}>Search</Button>
      </div>
      {err.length !== 0 && <Paper style={{ padding: "4%" }}>{err}</Paper>}
      {err.length === 0 && rollno.length !== 0 && (
        <SearchResults rollno={rollno} seterr={setErr} />
      )}
    </div>
  );
}
function containsOnlyNumbers(str: string) {
  return /^\d+$/.test(str);
}
