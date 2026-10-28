import React, { useEffect, useState } from "react";
import { useUser } from "../utils/userContext";
import {
  Typography,
  Paper,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Box,
  Grid,
  TextField,
} from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import requestHandler from "../../apiCalls/requestHandler";
import { CORE } from "../../apiCalls/endpoints";
import { errorToast } from "../utils/toastUtils";

export const getTodayDate = () => {
  return new Date().toISOString().split("T")[0];
};

const TakeAttendanceForm = ({ onSubmit, loading, title, buttonText }) => {
  const [classrooms, setClassrooms] = useState([]);
  const [selectedClassroom, setSelectedClassroom] = useState("");
  const [date, setDate] = useState(getTodayDate());
  const { userStatus } = useUser();

  useEffect(() => {
    const fetchClassrooms = async () => {
      const [data, error] = await requestHandler("get", CORE.CLASSROOM);
      if (data) {
        setClassrooms(data);
      } else {
        errorToast(error?.data?.detail || "Could not load classrooms.");
      }
    };
    fetchClassrooms();
  }, []);

  const handleSearchResult = () => {
    // Call the parent component's function with the selected classroom id and date
    onSubmit(selectedClassroom, date);
  };

  return (
    <Paper elevation={3} style={{ padding: 20 }}>
      <Typography variant="h6" gutterBottom>
        {title}
      </Typography>
      <Box sx={{ width: "100%", margin: "auto" }}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth margin="normal" required>
              <InputLabel id="classroom-label">Classroom</InputLabel>
              <Select
                labelId="classroom-label"
                id="classroom-select"
                value={selectedClassroom}
                label="Classroom"
                onChange={(e) => setSelectedClassroom(e.target.value)}
              >
                {classrooms.map((classroom) => (
                  <MenuItem key={classroom.id} value={classroom.id}>
                    {classroom.title} (Stream {classroom.stream})
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              margin="normal"
              required
              fullWidth
              label="Date"
              name="date"
              type="date"
              id="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              InputLabelProps={{ shrink: true }}
              inputProps={{ max: getTodayDate() }}
            />
          </Grid>
        </Grid>

        <LoadingButton
          variant="contained"
          type="submit"
          onClick={handleSearchResult}
          loading={loading}
          loadingPosition="start"
          sx={{ mt: 3, mb: 2, minWidth: "15%" }}
          disabled={!userStatus.isApproved || !selectedClassroom || !date}
        >
          {loading ? "Loading..." : buttonText}
        </LoadingButton>
      </Box>
    </Paper>
  );
};
export default TakeAttendanceForm;
