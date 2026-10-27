import { Box, Divider, Grid, Paper, Typography } from "@mui/material";
import React from "react";
import { FaEllipsisH } from "react-icons/fa";
import { Link } from "react-router-dom";
import { subjects } from "../../data/subjects";
import { useUser } from "../utils/userContext";
const DashboardAttendanceView = () => {
  const { role } = useUser();

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={6} lg={4}>
        <Paper
          sx={{
            boxShadow: "none !important",
            borderRadius: "12px",
            borderStyle: "solid",
            borderWidth: "1px",
            borderColor: "divider",

            padding: "16px",
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            {role === "Student" && (
              <Typography variant="h5" sx={{ pb: 1 }}>
                Enrolled Subject
              </Typography>
            )}
            {role === "Teacher" && (
              <Typography variant="h5" sx={{ pb: 1 }}>
                Subject Offered
              </Typography>
            )}

            <FaEllipsisH />
          </Box>
          <Divider />
          <Box sx={{ marginTop: 1 }}>
            {subjects.slice(0, 4).map(({ id, title, code, img }) => (
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  margin: "10px 0",
                }}
                key={id}
              >
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 2,
                  }}
                >
                  {/* <Avatar src={img} sx={{ width: 30, height: 30 }} /> */}
                  <Box>
                    <Typography variant="h6" sx={{ fontSize: "18px" }}>
                      {title}
                    </Typography>
                    <Typography variant="subtitle1" sx={{ opacity: 0.7 }}>
                      {code}
                    </Typography>
                  </Box>
                </Box>
                <FaEllipsisH />
              </Box>
            ))}
          </Box>
          <Divider />
          <Typography variant="subtitle1" sx={{ textAlign: "center", mt: 1 }}>
            <Link to="/subjects" className="link">
              View more
            </Link>
          </Typography>
        </Paper>
      </Grid>
      <Grid item xs={12} md={6} lg={8}>
        <Paper
          sx={{
            boxShadow: "none !important",
            borderRadius: "12px",
            borderStyle: "solid",
            borderWidth: "1px",
            borderColor: "divider",
            padding: "16px",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
          }}
        >
          <Typography variant="h5" gutterBottom>
            Attendance Coming Soon!
          </Typography>
          <Typography variant="body1" sx={{ opacity: 0.7 }}>
            Attendance tracking is not available yet. Stay tuned!
          </Typography>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default DashboardAttendanceView;
