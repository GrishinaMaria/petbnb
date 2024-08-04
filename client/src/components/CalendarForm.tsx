// import { Box, Button } from "@chakra-ui/react";
// import React, { useState } from "react";

// export default function CalendarForm({ onDatesChange }) {
//   const [startdate, setStartdate] = useState("");
//   const [enddate, setEnddate] = useState("");

//   const dateChangeHandler = () => {
//     onDatesChange({ startdate, enddate });
//   };

//   return (
//     <>
//     <Box>
  
//       <label for="startdate">Начало брони:</label>
//       <input type="date" id="startdate" name="startdate" onChange={(e) => setStartdate(e.target.value)}></input>
//       <br></br>
//       <label for="enddate">Конец брони:</label>
//       <input type="date" id="enddate" name="enddate" onChange={(e) => setEnddate(e.target.value)}></input>
//       <br></br>
//       <Button onClick={dateChangeHandler}>Сохранить</Button>
//       </Box>
//     </>
//   );
// }

import { useState } from "react";

import {
  Calendar,
  CalendarReserved,
  CalendarSelected,
} from "@demark-pro/react-booking-calendar";

import "@demark-pro/react-booking-calendar/dist/react-booking-calendar.css";

const oneDay = 86400000;
const today = new Date().getTime() + oneDay;

const reserved: CalendarReserved[] = Array.from({ length: 3 }, (_, i) => {
  const daysCount = Math.floor(Math.random() * (7 - 4) + 3);
  const startDate = new Date(today + oneDay * 8 * i);

  return {
    startDate,
    endDate: new Date(startDate.getTime() + oneDay * daysCount),
  };
});

const weekDays = [0, 1, 2];

export default function CalendarForm() {
  const [selected, setSelected] = useState<CalendarSelected[]>([]);

  return (
    <div>
      <Calendar
        selected={selected}
        reserved={reserved}
        range={true}
        protection={true}
        options={{ locale: "ru", weekStartsOn: 0, useAttributes: true }}
        onChange={setSelected}
        onOverbook={(date, type) => alert(type)}
        classNames={
          {
            // DayContent: "reserved-pink",
          }
        }
        disabled={(date, state) => {
          console.log(date.getDate(), weekDays.includes(date.getDay()));
          return weekDays.includes(date.getDay());
        }}
      />
    </div>
  );
}
