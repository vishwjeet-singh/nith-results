import { Paper } from "@mui/material";
import React from "react";
import "./ShortSearchResults.scss";
const ShortSearchResults = (props: {
  showData: { name: string; roll: string; cg: string | null }[];
  setroll: Function;
}) => {
  return (
    <div className="short-search-results">
      {props.showData.length === 0 && (
        <Paper className="the-error">Too much data found</Paper>
      )}
      {props.showData.map((val) => {
        return (
          <Paper
            className="container"
            onClick={() => {
              props.setroll(val.roll);
            }}
            key={val.roll}
          >
            {val.name}
            <br />
            {val.roll}
            <br />
            {val.cg}
            <br />
          </Paper>
        );
      })}
    </div>
  );
};
export default React.memo(ShortSearchResults);
