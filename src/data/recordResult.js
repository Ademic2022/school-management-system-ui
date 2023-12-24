// MyColumns.js
export const myColumns = [
  { 
    field: 'name', 
    headerName: 'Student Name', 
    width: 180,
    type: 'singleSelect',
    editable: true,
    valueOptions: ['John Doe', 'Jane Smith', 'Anthony Williams'],
  },
  {
    field: 'class',
    headerName: 'Class',
    type: 'singleSelect',
    width: 320,
    align: 'left',
    valueOptions: ['JUNIOR SECONDARY SCHOOL 3', 'JUNIOR SECONDARY SCHOOL 1'],
    editable: true,
  },
  {
    field: 'exam_type',
    headerName: 'Exam Type',
    width: 180,
    editable: true,
    type: 'singleSelect',
    valueOptions: ['CA-Test', 'Examination'],
  },
  {
    field: 'subject',
    headerName: 'Subject',
    type: 'singleSelect',
    width: 180,
    editable: true,
    valueOptions: ['Biology', 'Mathematics'],
  },
  {
    field: 'score',
    headerName: 'Score',
    width: 150,
    editable: true,
    type: 'number',
    align: 'left',
    headerAlign: 'left',
  },
];

// MyData.js
export const myData = [
  {
    id: 1,
    name: 'John Doe',
    class: "JUNIOR SECONDARY SCHOOL 1",
    exam_type: 'CA-Test',
    subject: "Biology",
    score: 50,
  },
];