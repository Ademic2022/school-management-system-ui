import React, { useState } from "react";
import styled from "@emotion/styled";
import { Box, Chip, Grid, Stack, Typography } from "@mui/material";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import TakeAttendanceForm from "../components/forms/TakeAttandanceForm";
import { errorToast } from "../components/utils/toastUtils";
import { apiErrorMessage } from "../components/utils/apiErrorMessage";
import {
  viewAttendanceColumn,
  toViewAttendanceRow,
} from "../data/viewAttendance";
import { attendanceStatuses } from "../data/takeAttendance";
import Table from "../components/Table";
import requestHandler from "../apiCalls/requestHandler";
import { CORE } from "../apiCalls/endpoints";

// Defined outside the component so it isn't recreated (and its children remounted) every render
const ComponentWrapper = styled(Box)({
  marginTop: "10px",
  paddingBottom: "10px",
});

const ViewAttendance = () => {
  const [data, setData] = useState(null);
  const [searchedDate, setSearchedDate] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSearchResult = async (classroomId, date) => {
    setData(null);
    setLoading(true);

    const [records, error] = await requestHandler(
      "get",
      CORE.GET_FILTERED_ATTENDANCE(classroomId, date)
    );
    setLoading(false);
    setSearchedDate(date);

    if (!records) {
      errorToast(apiErrorMessage(error, "Could not load attendance."));
      return;
    }
    setData(records.map(toViewAttendanceRow));
  };

  const countOf = (status) =>
    data.filter((row) => row.attendance === status).length;

  return (
    <Box sx={{ pt: "80px", pb: "20px" }}>
      <ToastContainer />
      <Typography variant="h6" sx={{ marginBottom: "14px" }}>
        Attendance Record
      </Typography>

      <ComponentWrapper>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <TakeAttendanceForm
              onSubmit={handleSearchResult}
              loading={loading}
              title="Query Attendance"
              buttonText="Search"
            />
          </Grid>
        </Grid>
      </ComponentWrapper>

      <ComponentWrapper>
        <Typography variant="h5" sx={{ my: 3 }}>
          Student Attendance Record{searchedDate ? ` for ${searchedDate}` : ""}
        </Typography>
        {data && data.length > 0 ? (
          <>
            <Stack direction="row" spacing={1} sx={{ mb: 2, flexWrap: "wrap" }}>
              {attendanceStatuses.map((status) => (
                <Chip key={status} label={`${status}: ${countOf(status)}`} />
              ))}
            </Stack>
            <Table
              data={data}
              fields={viewAttendanceColumn}
              numberOfRows={data.length}
              enableTopToolBar={true}
              enableBottomToolBar={true}
              enablePagination={true}
              enableRowSelection={false}
              enableColumnFilters={true}
              enableEditing={false}
              enableColumnDragging={true}
              showPreview={false}
            />
          </>
        ) : (
          <Typography variant="body1">
            {loading
              ? "Searching for data..."
              : data
              ? "No attendance has been taken for this class on this date."
              : "Select a classroom and date."}
          </Typography>
        )}
      </ComponentWrapper>
    </Box>
  );
};

export default ViewAttendance;
