import { statusColors } from "./takeAttendance";

// Table's PDF export prints Object.values(row) under these headers,
// so toViewAttendanceRow must return keys in the same order as the columns.
export const viewAttendanceColumn = [
  {
    accessorKey: "id",
    header: "#",
    size: 50,
  },
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "registration_number",
    header: "Reg No.",
  },
  {
    accessorKey: "attendance",
    header: "Status",
    Cell: ({ cell }) => (
      <span
        className="status"
        style={{
          color: statusColors[cell.getValue()],
          backgroundColor: `${statusColors[cell.getValue()]}33`,
        }}
      >
        {cell.getValue()}
      </span>
    ),
  },
  {
    accessorKey: "marked_by",
    header: "Marked By",
  },
  {
    accessorKey: "time",
    header: "Last Marked",
  },
];

export const toViewAttendanceRow = (record, index) => ({
  id: index + 1,
  name: record.student_name,
  registration_number: record.registration_number,
  attendance: record.status,
  marked_by: record.marked_by_name || "",
  time: new Date(record.updated_at).toLocaleTimeString(),
});
