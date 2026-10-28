import React, { useState } from "react";
import styled from "@emotion/styled";
import { Alert, Box, Grid, Typography } from "@mui/material";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import TakeAttendanceForm from "../components/forms/TakeAttandanceForm";
import { errorToast, successToast } from "../components/utils/toastUtils";
import { apiErrorMessage } from "../components/utils/apiErrorMessage";
import { columns } from "../data/takeAttendance";
import TableEditable from "../components/TableEditable";
import requestHandler from "../apiCalls/requestHandler";
import { CORE } from "../apiCalls/endpoints";

// Defined outside the component: a styled component created during render is a new
// component type every render, which remounts its children and wipes the grid's edits
const ComponentWrapper = styled(Box)({
  marginTop: "10px",
  paddingBottom: "10px",
});

const TakeAttendance = () => {
  const [data, setData] = useState(null);
  const [selection, setSelection] = useState(null);
  const [alreadyMarked, setAlreadyMarked] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleLoadClass = async (classroomId, date) => {
    setData(null);
    setLoading(true);

    // Load the roster and any attendance already saved for that day, so re-opening
    // a day shows (and updates) what was marked instead of resetting everyone
    const [[students, studentsError], [records, recordsError]] = await Promise.all([
      requestHandler("get", CORE.GET_CLASSROOM_STUDENTS(classroomId)),
      requestHandler("get", CORE.GET_FILTERED_ATTENDANCE(classroomId, date)),
    ]);
    setLoading(false);

    if (!students || !records) {
      errorToast(
        apiErrorMessage(studentsError || recordsError, "Could not load the class.")
      );
      return;
    }
    if (students.length === 0) {
      errorToast("There are no students in this classroom.");
      return;
    }

    const savedStatus = Object.fromEntries(
      records.map((record) => [record.student, record.status])
    );
    setAlreadyMarked(records.length > 0);
    setSelection({ classroomId, date });
    setData(
      students.map((student) => ({
        id: student.id,
        name: `${student.user.first_name} ${student.user.last_name}`,
        registration_number: student.registration_number,
        attendance: savedStatus[student.id] || "PRESENT",
      }))
    );
  };

  const handleSubmit = async (rows) => {
    const [result, error] = await requestHandler(
      "post",
      CORE.BULK_MARK_ATTENDANCE,
      {
        classroom: selection.classroomId,
        date: selection.date,
        records: rows.map((row) => ({ student: row.id, status: row.attendance })),
      }
    );

    if (!result) {
      errorToast(apiErrorMessage(error, "Attendance could not be saved."));
      return false;
    }
    successToast(
      `Attendance saved: ${result.created} new, ${result.updated} updated.`
    );
    setAlreadyMarked(true);
    return true;
  };

  return (
    <Box sx={{ pt: "80px", pb: "20px" }}>
      <ToastContainer />
      <Typography variant="h6" sx={{ marginBottom: "14px" }}>
        Take Attendance
      </Typography>

      <ComponentWrapper>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <TakeAttendanceForm
              onSubmit={handleLoadClass}
              loading={loading}
              title="Select Class"
              buttonText="Load Class"
            />
          </Grid>
        </Grid>
      </ComponentWrapper>

      <ComponentWrapper>
        <Typography variant="h5" sx={{ my: 3 }}>
          Student Attendance{selection ? ` for ${selection.date}` : ""}
        </Typography>
        {data ? (
          <>
            {alreadyMarked && (
              <Alert severity="info" sx={{ mb: 2 }}>
                Attendance was already taken for this day. Submitting again
                updates the saved records.
              </Alert>
            )}
            <TableEditable
              key={`${selection.classroomId}-${selection.date}`}
              myData={data}
              myColumns={columns}
              enableSubmitButton={true}
              onSubmit={handleSubmit}
            />
          </>
        ) : (
          <Typography variant="body1">
            {loading ? "Loading students..." : "Select a classroom and date."}
          </Typography>
        )}
      </ComponentWrapper>
    </Box>
  );
};

export default TakeAttendance;
