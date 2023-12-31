import { Paper, Typography, Grid } from "@mui/material";
import { useUser } from "../utils/userContext";

const ProfileOverview = ({ fullName, attendancePercentage, userName }) => {
  const { role } = useUser();
  return (
    <Paper elevation={3} style={{ padding: 20 }}>
      <Grid container spacing={2} alignItems="center">
        <Grid item xs={12} sm={4}>
          <img
            src={localStorage.getItem("userImage")}
            alt="Student"
            style={{ width: "100%", borderRadius: "50%" }}
          />
        </Grid>

        {role === "Student" && (
          <Grid item xs={12} sm={8}>
            <Typography variant="h4" gutterBottom>
              Welcome, {fullName}! Keep Going.
            </Typography>
            <Typography paragraph>
              Your current attendance is {attendancePercentage.toFixed(2)}%,
              which is{" "}
              {attendancePercentage > 75 ? "above" : "below or equal to"} 75.00%
              of the minimum attendance mark.
            </Typography>
          </Grid>
        )}

        {role === "Teacher" && (
          <Grid item xs={12} sm={8}>
            <Typography variant="h4" gutterBottom>
              Welcome, Mr. {userName.toUpperCase()}! Ready to Inspire.
            </Typography>
            <Typography paragraph>
              You are currently assigned to teach{" "}
              <span style={{ color: "green" }}>Mathematics</span> and{" "}
              <span style={{ color: "green" }}>Biology.</span> Keep track of
              your class schedules, manage student performance, and mark
              attendance to ensure a productive learning environment. Your
              dedication makes a difference!
            </Typography>
          </Grid>
        )}
      </Grid>
    </Paper>
  );
};
export default ProfileOverview;
