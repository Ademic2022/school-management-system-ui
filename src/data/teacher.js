import { Avatar } from "@mui/material";

export const editTeacherColumn = [
  {
    field: "id",
    headerName: "Id",
    width: 100,
    editable: true,
  },
  {
    field: "first_name",
    headerName: "First Name",
    width: 120,
    align: "left",
    editable: true,
    // type: "singleSelect",
    // valueOptions: ["John Smith", "Jane Doe", "Alice Williams", "Emily Davis"],
  },
  {
    field: "last_name",
    headerName: "Last Name",
    width: 120,
    align: "left",
    editable: true,
    // type: "singleSelect",
    // valueOptions: ["John Smith", "Jane Doe", "Alice Williams", "Emily Davis"],
  },
  {
    field: "email",
    headerName: "Email",
    width: 200,
    editable: true,
  },
  {
    field: "address",
    headerName: "Address",
    width: 350,
    editable: true,
  },
];

export const column = [
  {
    accessorKey: "img",
    header: "Image",
    size: 100,
    Cell: ({ cell }) => (
      <div>
        <Avatar src={cell.getValue()} sx={{ width: 30, height: 30 }}>{cell.row.original.name?.[0]}</Avatar>
      </div>
    ),
  },
  // {
  //   accessorKey: "id",
  //   header: "Id",
  //   size: 50,
  // },
  {
    accessorKey: "first_name",
    header: "First Name",
  },
  {
    accessorKey: "last_name",
    header: "Last Name",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "address",
    header: "Address",
  },
];

export const teachers = [
  {
    id: 1,
    first_name: "John",
    last_name: "Smith",
    name: "John Smith",
    email: "johnsmith@example.com",
    address: "123 Main Street, New York, NY 10001",
    subject: "English Language",
    assigned_subjects: [
      { title: "Mathematics", classroom: "Junior Secondary School 1" },
      { title: "English Language", classroom: "Junior Secondary School 3" },
    ],
  },
  {
    id: 2,
    first_name: "Jane",
    last_name: "Doe",
    name: "Jane Doe",
    email: "janedoe@example.com",
    address: "456 Park Avenue, New York, NY 10022",
    subject: "Mathematics",
    assigned_subjects: [
      { title: "Mathematics", classroom: "Junior Secondary School 1" },
      { title: "English Language", classroom: "Junior Secondary School 3" },
    ],
  },
  {
    id: 3,
    first_name: "Bob",
    last_name: "Johnson",
    name: "Bob Johnson",
    email: "bobjohnson@example.com",
    address: "789 Broadway, New York, NY 10011",
    subject: "Geography",
    assigned_subjects: [
      { title: "Mathematics", classroom: "Junior Secondary School 1" },
      { title: "English Language", classroom: "Junior Secondary School 3" },
    ],
  },
  {
    id: 4,
    first_name: "Alice",
    last_name: "Williams",
    name: "Alice Williams",
    email: "alicewilliams@example.com",
    address: "321 5th Avenue, New York, NY 10016",
    subject: "Economics",
    assigned_subjects: [
      { title: "Mathematics", classroom: "Junior Secondary School 1" },
      { title: "English Language", classroom: "Junior Secondary School 3" },
    ],
  },
];

/*  


address: null
date_joined: "2023-12-31T13:24:13.047322Z"
date_of_birth: "2023-01-15"
email: ""
first_name: "Adewale"
groups: []
id: 1
is_active: true
is_staff: false
is_superuser: false
last_login: "2024-01-02T10:26:35.322598Z"
last_name: "Johnson"
password: "pbkdf2_sha256$600000$xK4RCKII9F1wICqMWwdO2l$xoKT3NuvDOcsarKYjcOyL6+TAbjX4HJgURDShc9E+Ac="
role: "Teacher"
sex: "Male"
user_permissions: []
username: "adewale"

*/