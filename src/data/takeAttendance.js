// Must match AttendanceStatusChoices on the server; any other value is rejected with a 400
export const attendanceStatuses = ["PRESENT", "ABSENT", "LATE", "LEAVE"];

export const statusColors = {
  PRESENT: "#388b84",
  ABSENT: "#fd4332",
  LATE: "#ff9966",
  LEAVE: "#5b6bd5",
};

export const columns = [
  {
    field: "name",
    headerName: "Name",
    width: 300,
    editable: false,
  },
  {
    field: "registration_number",
    headerName: "Registration Number",
    editable: false,
    width: 250,
    align: "left",
    headerAlign: "left",
  },
  {
    field: "attendance",
    headerName: "Attendance",
    type: "singleSelect",
    width: 200,
    align: "left",
    valueOptions: attendanceStatuses,
    editable: true,
    renderCell: (params) => (
      <div style={{ color: statusColors[params.value] }}>{params.value}</div>
    ),
  },
];
