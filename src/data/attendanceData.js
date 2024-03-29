const attendanceData = [
  { id: 1, date: "2023-12-01", status: "present" },
  { id: 2, date: "2023-12-04", status: "present" },
  { id: 3, date: "2023-12-06", status: "present" },
  { id: 4, date: "2023-12-07", status: "present" },
  { id: 5, date: "2023-12-08", status: "present" },
  { id: 6, date: "2023-12-11", status: "present" },
  { id: 7, date: "2023-12-13", status: "present" },
  { id: 8, date: "2023-12-14", status: "present" },
  { id: 9, date: "2023-12-05", status: "absent" },
  { id: 10, date: "2023-12-10", status: "holiday" },
  { id: 11, date: "2023-12-12", status: "absent" },
  { id: 12, date: "2023-12-18", status: "present" },
  { id: 13, date: "2023-12-22", status: "absent" },
  { id: 14, date: "2023-12-25", status: "present" },
  { id: 15, date: "2023-12-26", status: "absent" },
  { id: 16, date: "2023-12-15", status: "late" },
  { id: 17, date: "2023-12-19", status: "present" },
  { id: 18, date: "2023-12-20", status: "present" },
  { id: 19, date: "2023-12-21", status: "late" },
  { id: 20, date: "2023-12-03", status: "holiday" },
  { id: 21, date: "2023-12-17", status: "holiday" },
  { id: 22, date: "2023-12-24", status: "holiday" },
];

export const eventsData = attendanceData.map((record) => {
  let color;
  let textColor;
  const dayOfWeek = new Date(record.date).getDay();

  // Check if the day is a Sunday
  if (dayOfWeek === 0) {
    color = "gray"; // Set Sunday as a holiday with a gray background
    textColor = "white";
  } else {
    switch (record.status) {
      case "present":
        color = "green";
        textColor = "white";
        break;
      case "absent":
        color = "red";
        textColor = "white";
        break;
      case "late":
        color = "yellow";
        textColor = "black";
        break;
      default:
        color = "transparent";
        textColor = "black";
    }
  }

  return {
    title: record.status.charAt(0).toUpperCase() + record.status.slice(1),
    date: record.date,
    rendering: "background", // Show the event as a background event
    backgroundColor: color,
    textColor: textColor,
    className: `custom-event-${record.status.toLowerCase()}`, // Add a custom class
  };
});

const roundDecimal = (number, decimalPlaces) => {
  const factor = 10 ** decimalPlaces;
  return Math.round(number * factor) / factor;
};
export const dashboardAttendanceData = () => {
  const { total, present, late, absent, half_day } = {
    total: 60,
    present: 38,
    late: 5,
    absent: 3,
    half_day: 4,
  };
  const total_present = present + late + half_day;
  const percentage_present =
    total !== 0 ? roundDecimal((present / total) * 100, 2) : 0;
  const percentage_absent =
    total !== 0 ? roundDecimal((absent / total) * 100, 2) : 0;
  const percentage_late =
    total !== 0 ? roundDecimal((late / total) * 100, 2) : 0;
  const percentage_half_day =
    total !== 0 ? roundDecimal((half_day / total) * 100, 2) : 0;
  const percentage_total_present =
    total !== 0 ? roundDecimal((total_present / total) * 100, 2) : 0;

  return {
    total: total,
    present: present,
    absent: absent,
    late: late,
    half_day: half_day,
    percentage_present: percentage_present,
    percentage_absent: percentage_absent,
    percentage_late: percentage_late,
    percentage_half_day: percentage_half_day,
    percentage_total_present: percentage_total_present,
    present_ratio: `${total_present}/${total}`,
  };
};
