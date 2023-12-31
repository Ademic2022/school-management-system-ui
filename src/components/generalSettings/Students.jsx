import React, { useState, useEffect } from "react";
import { Box, Typography, Paper, Toolbar } from "@mui/material";
// import TableEditable from "../TableEditable";
import { column } from "../../data/teacher";
import Table from "../../components/Table";
import { getFetchedData } from "../../apiCalls/authApi";
import { CORE } from "../../apiCalls/endpoints";

const Students = () => {
  const [studentData, setStudentData] = useState();

  useEffect(() => {
    const fetchStudentData = async () => {
      try {
        const fetchedData = await getFetchedData(CORE.STUDENT);
        const arrayOfUsers = fetchedData.map((obj) => ({
          ...obj.user,
          id: obj.id,
        }));
        setStudentData(arrayOfUsers);
      } catch (error) {
        console.error("Error:", error.message);
      }
    };

    fetchStudentData();
    // eslint-disable-next-line
  }, []);

  return (
    <Box
      component="main"
      sx={{ flexGrow: 1, bgcolor: "background.default", pb: "20px" }}
    >
      <Paper sx={{ mb: 1 }}>
        <Toolbar>
          <Typography variant="h6" noWrap component="div">
            Students
          </Typography>
        </Toolbar>
      </Paper>

      {/* First Box with TableEditable */}
      <Box sx={{ mt: 2 }}>
        {studentData ? (
          <Table
            data={studentData}
            fields={column}
            numberOfRows={studentData.length}
            enableTopToolBar={true}
            enableBottomToolBar={true}
            enablePagination={true}
            enableRowSelection={false}
            enableColumnFilters={true}
            enableEditing={true}
            enableColumnDragging={true}
            showPreview={true}
            routeLink="student"
          />
        ) : (
          <Typography variant="h6">Loading students data...</Typography>
        )}
      </Box>
    </Box>
  );
};

export default Students;
