import { Paper } from "@mui/material";
import React from "react";
import "./ShortSearchResults.scss";
import { motion } from "framer-motion";
const ShortSearchResults = (props: {
  showData: { name: string; roll: string; cg: string | null }[];
  setroll: Function;
}) => {
  return (
    <motion.div
      initial={{ x: 100 }}
      animate={{ x: 0 }}
      exit={{ x: -100 }}
      className="short-search-results"
    >
      {props.showData.length === 0 && (
        <Paper className="the-error">Too much data found</Paper>
      )}
      {props.showData.map((val) => {
        return (
          <motion.div
            className="container"
            onClick={() => {
              props.setroll(val.roll);
            }}
            key={val.roll}
            initial={{ opacity: 0 }}
            whileTap={{ scale: 0.9 }}
            whileInView={{ opacity: 1 }}
          >
            <motion.div>{val.name}</motion.div>
            <motion.div>{val.roll}</motion.div>
            <motion.div>{val.cg}</motion.div>
          </motion.div>
        );
      })}
    </motion.div>
  );
};
export default React.memo(ShortSearchResults);
