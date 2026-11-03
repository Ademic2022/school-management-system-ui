import styled from "@emotion/styled";
import { Box, Grid, Paper, Typography } from "@mui/material";
import React from "react";
import ProfileOverview from "../components/home/ProfileOverview";
import TeachersList from "../components/home/TeachersList";
import Subjects from "../components/home/Subjects";
import { Table } from "../components/Table";
import { timetableData, timetableColumns } from "../data/timetable";
import "react-toastify/dist/ReactToastify.css";
import { useUser } from "../components/utils/userContext";
import TopStudents from "../components/home/TopStudents";
import DashboardAttendanceView from "../components/home/DashboardAttendanceView";

const Dashboard = () => {
  const ComponentWrapper = styled(Box)({
    marginTop: "10px",
    paddingBottom: "10px",
  });
  const { user, auth, role } = useUser();
  if (!auth) {
    // User is not logged in, redirecting is handled in the custom hook
    return null;
  }

  return (
    <Box sx={{ pt: "80px", pb: "20px" }}>
      <Typography variant="h6" sx={{ marginBottom: "14px" }}>
        Dashboard
      </Typography>
      <ComponentWrapper>{/* <Stats /> */}</ComponentWrapper>

      <ComponentWrapper>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6} lg={8}>
            <ProfileOverview
              fullName={user.first_name + " " + user.last_name}
              attendancePercentage={91.67}
              userName={user.username}
            />
          </Grid>
          <Grid item xs={12} md={6} lg={4}>
            <Paper
              sx={{
                boxShadow: "none !important",
                borderRadius: "12px",
                borderStyle: "solid",
                borderWidth: "1px",
                borderColor: "divider",
                height: "100%",
              }}
            >
              {role === "Student" && <TeachersList />}

              {role === "Teacher" && <TopStudents />}
            </Paper>
          </Grid>
        </Grid>
      </ComponentWrapper>
      <ComponentWrapper>
        {role === "Student" && <Subjects />}
        {role === "Teacher" && <DashboardAttendanceView />}
      </ComponentWrapper>

      <ComponentWrapper>
        <Typography variant="h5" sx={{ my: 3 }}>
          Time Table
        </Typography>
        <Table
          data={timetableData}
          fields={timetableColumns}
          numberOfRows={5}
          enableTopToolBar={true}
          enableBottomToolBar={false}
          enablePagination={false}
          enableRowSelection={false}
          enableColumnFilters={false}
          enableEditing={false}
          enableColumnDragging={false}
        />
      </ComponentWrapper>
    </Box>
  );
};

export default Dashboard;
