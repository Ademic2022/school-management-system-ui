import React from "react";
import styled from "@emotion/styled";
import { Avatar, Box, Grid, Paper, Typography } from "@mui/material";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { useUser } from "../components/utils/userContext";
import StudentResultCard from "../components/StudentResultCard";
import { Table } from "../components/Table";
import { resultsData, resultColumn } from "../data/results";

const ExamResult = () => {
  const { user } = useUser();
  const ComponentWrapper = styled(Box)({
    marginTop: "10px",
    paddingBottom: "10px",
  });
  return (
    <Box sx={{ pt: "80px", pb: "20px" }}>
      <ToastContainer />
      <Typography variant="h6" sx={{ marginBottom: "14px" }}>
        Results
      </Typography>
      <ComponentWrapper>{/* <Stats /> */}</ComponentWrapper>

      <ComponentWrapper>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6} lg={9}>
            <StudentResultCard
              userName={user.first_name + " " + user.last_name}
              attendancePercentage={91.67}
            />
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <Paper
              sx={{
                boxShadow: "none !important",
                borderRadius: "12px",
                borderStyle: "solid",
                borderWidth: "1px",
                borderColor: "divider",
                height: "100%",
                display: "flex",
                alignItems: "center",
              }}
            >
              {/* <TeachersList /> */}
              <Avatar
                alt="Student"
                sx={{ width: 160, height: 160, mx: "auto", fontSize: 64 }}
              >
                {user.first_name?.[0]}
              </Avatar>
            </Paper>
          </Grid>
        </Grid>
      </ComponentWrapper>

      <ComponentWrapper>
        <Typography variant="h5" sx={{ my: 3 }}>
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
      </ComponentWrapper>
    </Box>
  );
};

export default ExamResult;
