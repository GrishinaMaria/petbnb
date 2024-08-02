import { Box, Button } from "@chakra-ui/react";
import React, { useState } from "react";

export default function CalendarForm({ onDatesChange }) {
  const [startdate, setStartdate] = useState("");
  const [enddate, setEnddate] = useState("");

  const dateChangeHandler = () => {
    onDatesChange({ startdate, enddate });
  };

  return (
    <>
    <Box>
  
      <label for="startdate">Начало брони:</label>
      <input type="date" id="startdate" name="startdate" onChange={(e) => setStartdate(e.target.value)}></input>
      <br></br>
      <label for="enddate">Конец брони:</label>
      <input type="date" id="enddate" name="enddate" onChange={(e) => setEnddate(e.target.value)}></input>
      <br></br>
      <Button onClick={dateChangeHandler}>Сохранить</Button>
      </Box>
    </>
  );
}
