import { Box, Grid, Divider, TextField, Typography } from "@mui/material";
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import LoadingButton from "@mui/lab/LoadingButton";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { CORE } from "../../apiCalls/endpoints";
import SubjectsSelectionComponent from "./SubjectSelection";
import { errorToast, successToast } from "../utils/toastUtils";
import requestHandler from "../../apiCalls/requestHandler";
import { useUser } from "../utils/userContext";

const TeachersDetails = () => {
  const { id } = useParams();
  const [teacherData, setTeacherData] = useState({});
  const [subjects, setSubjects] = useState([]);
  const [selectedClassrooms, setSelectedClassrooms] = useState([]);
  const [selectedSubjects, setSelectedsubjects] = useState([]);
  const [userSubjects, setUserSubjects] = useState([]);
  const [classrooms, setClassrooms] = useState([]);
  const [loading, setLoading] = useState(false);
  const { userStatus } = useUser();
  const [loadingSubjects, setLoadingSubjects] = useState(false);

  useEffect(() => {
    const fetchTeacherData = async () => {
      try {
        const fetchedData = await requestHandler("get", CORE.GET_TEACHER(id));

        setTeacherData(fetchedData[0].user);
        setSelectedClassrooms([fetchedData[0].classroom.id]);
        const usersubject = fetchedData[0].assigned_subjects;
        // Extracting ids into an array
        const subjectIdsArray = usersubject.map((subject) => subject.id);
        setUserSubjects(subjectIdsArray);
        setSelectedsubjects(subjectIdsArray);
      } catch (error) {
        console.error("Error:", error.message);
      }
    };
    fetchTeacherData();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    const fetchClassroomData = async () => {
      try {
        const fetchedData = await requestHandler("get", CORE.CLASSROOM);

        setClassrooms(fetchedData[0]);
      } catch (error) {
        console.error("Error:", error.message);
      }
    };

    fetchClassroomData();
  }, []);

  useEffect(() => {
    const fetchSubjectsData = async (classroomId) => {
      try {
        // Set loading state to true when subjects are being fetched
        setLoadingSubjects(true);

        const fetchedData = await requestHandler(
          "get",
          CORE.GET_FILTERED_SUBJECT(classroomId)
        );
        setSubjects(fetchedData[0]);

        // Log the updated subjects immediately
      } catch (error) {
        // Handle errors appropriately
        console.error("Error fetching subjects:", error.message);
      } finally {
        // Set loading state to false regardless of success or error
        setLoadingSubjects(false);
      }
    };

    if (selectedClassrooms.length !== 0) {
      const classroomId = parseInt(selectedClassrooms.join(""));

      fetchSubjectsData(classroomId);
    }
  }, [selectedClassrooms]);

  if (!Object.keys(teacherData).length) {
    return <div>Loading...</div>;
  }

  const handleClassroomToggle = (classroomId) => {
    // If the selected classroom is already selected, deselect it
    const updatedSelection =
      selectedClassrooms[0] === classroomId ? [] : [classroomId];
    setSelectedClassrooms(updatedSelection);
    setSelectedsubjects([]);
    setUserSubjects([]);
  };
  const handleAssignSubjectSelection = (selectedSubjects, ...selectedIds) => {
    // new array that includes both old and new items
    const updatedSelectedSubjects = [...selectedSubjects, ...selectedIds];
    setSelectedsubjects(updatedSelectedSubjects);
  };

  const handleUpdateProfile = async () => {
    setLoading(true);
    const updatedFields = {
      classroom: selectedClassrooms[0],
      assigned_subjects: selectedSubjects,
    };

    const fetchedData = await requestHandler(
      "patch",
      CORE.GET_TEACHER(id),
      updatedFields
    );
    await new Promise((resolve) => setTimeout(resolve, 1000));
    if (fetchedData[0] === null) {
      errorToast(
        `Error Updating ${
          teacherData.username.charAt(0).toUpperCase() +
          teacherData.username.slice(1)
        }'s Profile`
      );
      setLoading(false);
    } else {
      successToast(
        `${
          teacherData.username.charAt(0).toUpperCase() +
          teacherData.username.slice(1)
        }'s Profile Updated!`
      );
      setLoading(false);
    }
  };

  if (!teacherData) {
    return <Typography variant="h6">Loading...</Typography>;
  }

  return (
    <Box sx={{ pt: "80px", pb: "20px" }}>
      <Box>
        <Typography variant="h6" sx={{ my: 3 }}>
          {`${teacherData.username
            .split(" ")
            .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
            .join(" ")}'s Profile Information`}
        </Typography>
        <Divider />
        <Box sx={{ mt: 3 }}>
          <Typography variant="subtitle1">Profile image</Typography>
          {/* <Avatar src={teacherData.img} /> */}
          <Box sx={{ mt: 4, display: "flex", alignItems: "center", gap: 4 }}>
            <TextField
              label="First Name"
              variant="outlined"
              rows={4}
              fullWidth
              defaultValue={teacherData.first_name}
              InputProps={{
                readOnly: true,
              }}
            />
            <TextField
              label="Last Name"
              variant="outlined"
              rows={4}
              fullWidth
              defaultValue={teacherData.last_name}
              InputProps={{
                readOnly: true,
              }}
            />
          </Box>
          <Box sx={{ mt: 4, display: "flex", alignItems: "center", gap: 4 }}>
            <TextField
              label="Username"
              variant="outlined"
              rows={4}
              fullWidth
              defaultValue={teacherData.username}
              InputProps={{
                readOnly: true,
              }}
            />
            <TextField
              label="Role"
              variant="outlined"
              rows={4}
              fullWidth
              defaultValue={teacherData.role}
              InputProps={{
                readOnly: true,
              }}
            />
          </Box>
          <Box sx={{ my: 2 }}>
            <TextField
              label="Email"
              variant="outlined"
              fullWidth
              defaultValue={teacherData.email}
              InputProps={{
                readOnly: true,
              }}
            />
          </Box>
          <Box sx={{ my: 2 }}>
            <TextField
              label="Address"
              variant="outlined"
              fullWidth
              defaultValue={teacherData.address}
              InputProps={{
                readOnly: true,
              }}
            />
          </Box>
          <Typography variant="h6" sx={{ my: 3 }}>
            Assigned/Assign ClassRoom
          </Typography>

          <Box sx={{ display: "flex" }}>
            <Grid container spacing={2}>
              {[classrooms.slice(0, 3), classrooms.slice(3, 6)].map(
                (classroomSlice, index) => (
                  <Grid item xs={6} key={index}>
                    <RadioGroup
                      value={selectedClassrooms[0]}
                      onChange={() => {}}
                    >
                      {classroomSlice.map((classroom) => (
                        <FormControlLabel
                          key={classroom.id}
                          value={classroom.id.toString()}
                          control={<Radio />}
                          label={classroom.title}
                          onChange={() => handleClassroomToggle(classroom.id)}
                        />
                      ))}
                    </RadioGroup>
                  </Grid>
                )
              )}
            </Grid>
          </Box>
          {selectedClassrooms ? (
            loadingSubjects ? ( // Check if subjects are being loaded
              <Typography variant="body1">Loading subjects...</Typography>
            ) : subjects ? (
              <SubjectsSelectionComponent
                options={subjects}
                label="Selected Subjects:"
                placeholder="select subjects"
                onSelectionChange={handleAssignSubjectSelection}
                assigned_subjects={userSubjects}
              />
            ) : (
              <Typography variant="body1">No subjects available.</Typography>
            )
          ) : (
            <Typography variant="body1">Please select classrooms...</Typography>
          )}
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              mt: 3,
            }}
          >
            <LoadingButton
              type="submit"
              loading={loading}
              loadingPosition="start"
              variant="contained"
              onClick={handleUpdateProfile}
              sx={{ width: "180px" }}
              disabled={!userStatus.isApproved}
            >
              {loading ? "Please Wait..." : "Save Changes"}
            </LoadingButton>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default TeachersDetails;
