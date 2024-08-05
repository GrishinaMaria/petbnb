import {
  Calendar,
  CalendarReserved,
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

export default function CalendarForm({selectedDates, setSelectedDates}) {
  // const [selected, setSelected] = useState<CalendarSelected[]>([]);

  return (
    <div>
      <Calendar
        selected={selectedDates}
        reserved={reserved}
        range={true}
        protection={true}
        options={{ locale: "ru", weekStartsOn: 1, useAttributes: true }}
        onChange={setSelectedDates}
        onOverbook={(date, type) => alert(type)}
        classNames={
          {
            // DayContent: "reserved-pink",
          }
        }
        disabled={(date, state) => {
          // console.log(date.getDate(), weekDays.includes(date.getDay()));
          return weekDays.includes(date.getDay());
        }}
      />
    </div>
  );
}
