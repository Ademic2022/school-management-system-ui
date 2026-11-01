import { Avatar, Box, Grid, Paper, Typography } from "@mui/material";
import React from "react";
import { useParams } from "react-router-dom";
import { students, teachers } from "../data/studentsTeachers";
import { useUser } from "../components/utils/userContext";
import Table from "../components/Table";
import { resultsData, resultColumn } from "../data/results";

const UserDetails = () => {
  const { role } = useUser();
  const { id } = useParams();
  let user;

  if (role === "Teacher") {
    user = students.find((student) => student.id === parseInt(id));
  } else if (role === "Student") {
    user = teachers.find((teacher) => teacher.id === parseInt(id));
  }
  const { name, email, address, phone, img } = user;

  switch (role) {
    case "Student":
      return (
        <Box sx={{ pt: "80px", pb: "20px" }}>
          <Typography variant="h5">Teachers Profile</Typography>

          <Grid container spacing={2}>
            <Grid item xs={12} sm={8}>
              <Paper elevation={3} sx={{ padding: 2 }}>
                <Typography variant="h6" gutterBottom>
                  <strong>Teachers Information</strong>
                </Typography>
                <Typography>Name: {name.toUpperCase()}</Typography>
                <Typography>Email: {email}</Typography>
                <Typography>
                  Session/Semester: HARMATTAN SEMESTER 2022/2023 SESSION
                </Typography>
                <Typography>
                  Current Class: Junior Secondary School 3
                </Typography>
                <Typography>Address: {address}</Typography>
                <Typography variant="h6" gutterBottom sx={{ paddingTop: 2 }}>
                  <strong>Subjects Information</strong>
                </Typography>
                <Grid container spacing={1}>
                  {user.assigned_subjects.map((subject, index) => (
                    <Grid item xs={6} key={index}>
                      <Typography>
                        <strong>Subject:</strong> {subject.title}
                      </Typography>
                      <Typography>
                        <strong>Classroom:</strong> {subject.classroom}
                      </Typography>
                    </Grid>
                  ))}
                </Grid>
              </Paper>
            </Grid>

            <Grid item xs={12} md={6} lg={4}>
              <Paper
                elevation={3}
                sx={{
                  borderRadius: "12px",
                  borderStyle: "solid",
                  borderWidth: "1px",
                  borderColor: "divider",
                  height: "100%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Avatar
                  src={img}
                  alt={name}
                  sx={{ width: 160, height: 160, fontSize: 64 }}
                >
                  {name[0]}
                </Avatar>
              </Paper>
            </Grid>
          </Grid>
        </Box>
      );
    case "Teacher":
      return (
        <Box sx={{ pt: "80px", pb: "20px" }}>
          <Typography variant="h5" sx={{ my: 3 }}>Sudent Profile</Typography>

          <Grid container spacing={2}>
            <Grid item xs={12} sm={8}>
              <Paper elevation={3} sx={{ padding: 2 }}>
                <Typography variant="h6" gutterBottom>
                  <strong>Sudent Information</strong>
                </Typography>
                <Typography>Registration Number: AGE/2019/002</Typography>
                <Typography>Name: {name.toUpperCase()}</Typography>
                <Typography>Email: {email}</Typography>
                <Typography>Phone: {phone}</Typography>
                <Typography>
                  Session/Semester: HARMATTAN SEMESTER 2022/2023 SESSION
                </Typography>
                <Typography>
                  Current Class: Junior Secondary School 3
                </Typography>
                <Typography>Address: {address}</Typography>
              </Paper>
            </Grid>

            <Grid item xs={12} md={6} lg={4}>
              <Paper
                elevation={3}
                sx={{
                  borderRadius: "12px",
                  borderStyle: "solid",
                  borderWidth: "1px",
                  borderColor: "divider",
                  height: "100%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Avatar
                  src={img}
                  alt={name}
                  sx={{ width: 160, height: 160, fontSize: 64 }}
                >
                  {name[0]}
                </Avatar>
              </Paper>
            </Grid>
          </Grid>
          <Typography variant="h6" sx={{ my: 3 }}>
            Registered Subjects
          </Typography>
          <Table
            data={resultsData}
            fields={resultColumn}
            numberOfRows={resultsData.length}
            enableTopToolBar={true}
            enableBottomToolBar={true}
            enablePagination={false}
            enableRowSelection={false}
            enableColumnFilters={false}
            enableEditing={false}
            enableColumnDragging={false}
          />
        </Box>
      );
    default:
      return null;
  }
};

export default UserDetails;
