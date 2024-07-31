import { Box, Button } from "@chakra-ui/react";
import React, { useState } from "react";

export default function CalendarForm({ onDatesChange }) {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const dateChangeHandler = () => {
    onDatesChange({ startDate, endDate });
  };

  return (
    <>
    <Box>
  
      <label for="startdate">Начало брони:</label>
      <input type="date" id="startdate" name="startdate" onChange={(e) => setStartDate(e.target.value)}></input>
      <br></br>
      <label for="enddate">Конец брони:</label>
      <input type="date" id="enddate" name="enddate" onChange={(e) => setEndDate(e.target.value)}></input>
      <br></br>
      <Button onClick={dateChangeHandler}>Сохранить</Button>
      </Box>
    </>
  );
}
