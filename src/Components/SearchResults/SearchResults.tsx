import React, { useState, useEffect } from "react";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import axios from "axios";
import "./SearchResults.scss";
const SearchResults = (props: { rollno: string; seterr: Function }) => {
  console.log("rendering");
  const [name, setName] = useState("");
  const [sem1, setSem1] =
    useState<{ subjectName: string; pointer: string }[]>();
  const [sem2, setSem2] =
    useState<{ subjectName: string; pointer: string }[]>();
  const [roll, setRoll] = useState("");
  useEffect(() => {}, []);
  useEffect(() => {
    axios
      .get(`/${props.rollno}.json`)
      .then((res) => {
        console.log(res);
        if (!res.data) {
          props.seterr("Student not found");
          return;
        }
        setName(res.data.name);
        setRoll(res.data.roll);
        const keys = Object.keys(res.data.result).filter(
          (val) => val.charAt(0) === "s"
        );
        const s1: { subjectName: string; pointer: string }[] = [];
        const s2: { subjectName: string; pointer: string }[] = [];
        keys.forEach((key, index) => {
          res.data.result[key].map((val: string[]) => {
            if (key === "s01")
              s1.push({
                subjectName: val[0],
                pointer: pointer_to_grade[val[3]],
              });
            else
              s2.push({
                subjectName: val[0],
                pointer: pointer_to_grade[val[3]],
              });
          });
        });
        setSem1(s1);
        setSem2(s2);
      })
      .catch((err) => console.log(err));

    return () => {
      setRoll("");
    };
  }, [props.rollno]);

  if (roll.length === 0) return null;
  return (
    <div className="search-results">
      <Paper elevation={2} className="inner-card">
        {name} {roll}
      </Paper>
      <Paper elevation={4} className="headings">
        Semester 1
      </Paper>
      {sem1 && (
        <TableContainer component={Paper} sx={{ width: "fit-content" }}>
          <Table aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell>Subject Name</StyledTableCell>
                <StyledTableCell align="right">Pointer</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {sem1.map((row) => (
                <StyledTableRow key={row.subjectName}>
                  <StyledTableCell component="th" scope="row">
                    {row.subjectName}
                  </StyledTableCell>
                  <StyledTableCell align="right">{row.pointer}</StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
      <Paper elevation={4} className="headings">
        Semester 2
      </Paper>
      {sem2 && (
        <TableContainer component={Paper} sx={{ width: "fit-content" }}>
          <Table aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell>Subject Name</StyledTableCell>
                <StyledTableCell align="right">Pointer</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {sem2.map((row) => (
                <StyledTableRow key={row.subjectName}>
                  <StyledTableCell component="th" scope="row">
                    {row.subjectName}
                  </StyledTableCell>
                  <StyledTableCell align="right">{row.pointer}</StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </div>
  );
};
export default React.memo(SearchResults);
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

function createData(subjectName: string, pointer: string) {
  return { subjectName, pointer };
}

const rows = [
  createData("Analog electronics", "10"),
  createData("Communication skills", "8"),
];
interface Map {
  [key: string]: string;
}
const pointer_to_grade: Map = {
  A: "10",
  AB: "9",
  B: "8",
  BC: "7",
  C: "6",
  CD: "5",
  D: "4",
  F: "0",
};
