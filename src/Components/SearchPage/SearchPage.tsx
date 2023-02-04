import { useEffect, useState } from "react";
import "./SearchPage.scss";
import { TextField, Button } from "@mui/material";
import SearchResults from "../SearchResults/SearchResults";
import ShortSearchResults from "../ShortSearchResults/ShortSearchResults";
import { allName as nameRoll } from "../../MappingData/nameRoll";
import { Paper } from "@mui/material";
import { AnimatePresence, motion } from "framer-motion";
export default function SearchPage() {
  const [value, setValue] = useState("");
  const [rollno, setRollno] = useState("");
  const [err, setErr] = useState("");
  const [searchRes, setSearchRes] = useState<
    { name: string; roll: string; cg: string | null }[]
  >([]);
  const selectRollnoHandler = (rn: string) => {
    setRollno(rn);
  };
  useEffect(() => {
    const newData:
      | ((prevState: never[]) => never[])
      | (
          | { name: string; roll: string; cg: string }
          | { name: string; roll: string; cg: null }
        )[] = [];
    nameRoll.map((val) => {
      if (
        value.length !== 0 &&
        (val.name.toLowerCase().startsWith(value.toLowerCase()) ||
          val.roll.startsWith(value))
      )
        newData.push({ ...val });
    });
    setSearchRes(newData);
  }, [value]);
  return (
    <div className="search-page">
      <AnimatePresence>
        {rollno.length === 0 && (
          <motion.div
            initial={{ x: -200, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -200, opacity: 0 }}
          >
            <TextField
              id="outlined-basic"
              label="Name or Roll no."
              variant="outlined"
              value={value}
              onChange={(e) => {
                setValue(e.target.value);
              }}
            />
            <br />
          </motion.div>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {rollno.length === 0 && (
          <ShortSearchResults
            showData={searchRes}
            setroll={selectRollnoHandler}
          />
        )}
      </AnimatePresence>
      <AnimatePresence>
        {rollno.length !== 0 && (
          <SearchResults rollno={rollno} setroll={setRollno} />
        )}
      </AnimatePresence>
    </div>
  );
}
