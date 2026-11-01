import React, { useState } from "react";
import Avatar from "@mui/material/Avatar";
import CssBaseline from "@mui/material/CssBaseline";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import AlignItemsList from "../components/Announcement";
import LoginForm from "../components/forms/LoginForm";
import RegisterForm from "../components/forms/RegisterForm";
import ResetPasswordForm from "../components/forms/ResetPasswordForm";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="#">
        The Gem
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

function Authentication() {
  const [showLoginForm, setShowLoginForm] = useState(true);
  const [showResetPasswordForm, setShowResetPasswordForm] = useState(false); // New state

  const handleToggleForm = () => {
    setShowLoginForm((prev) => !prev);
    setShowResetPasswordForm(false);
  };
  const handleForgotPasswordClick = () => {
    setShowResetPasswordForm(true);
    setShowLoginForm(false);
  };
  const handleFormSubmit = (formData) => {
    // Handle form submission based on current form type (login/register)
    if (showLoginForm) {
      // Handle login form submission
      console.log("Login data:", formData);
    } else {
      // Handle registration form submission
      console.log("Registration data:", formData);
    }
  };
  const handleResetPasswordSubmit = (formData) => {
    // Handle reset password form submission
    console.log("Reset Password data:", formData);
    // Implement the logic for sending a reset password link to the user's email
  };
  return (
    <ThemeProvider theme={createTheme()}>
      <Grid container component="main" sx={{ height: "100vh" }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            position: "relative",
            backgroundColor: "primary.dark",
          }}
        >
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              textAlign: "center",
              color: "#fff",
              width: "90%",
            }}
          >
            <Typography variant="h4">
              Welcome to The Gem International School
            </Typography>
            {/* Add any additional overlay text here */}
            <AlignItemsList />
          </Box>
        </Grid>
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              {showLoginForm
                ? "Sign In"
                : showResetPasswordForm
                ? "Reset Password"
                : "Register"}
            </Typography>
            {/* Toggle between login, registration, and reset password forms */}
            {showLoginForm && !showResetPasswordForm && (
              <LoginForm
                onSubmit={handleFormSubmit}
                onForgotPassword={handleForgotPasswordClick}
              />
            )}
            {!showLoginForm && !showResetPasswordForm && (
              <RegisterForm onSubmit={handleFormSubmit} />
            )}
            {showResetPasswordForm && (
              <ResetPasswordForm
                onSubmit={handleResetPasswordSubmit}
                onCancel={handleToggleForm}
              />
            )}
            {!showResetPasswordForm && (
              <Grid container>
                <Grid item xs>
                  <Link
                    href="#"
                    variant="body2"
                    onClick={handleForgotPasswordClick}
                  >
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item>
                  <Link href="#" variant="body2" onClick={handleToggleForm}>
                    {showLoginForm
                      ? "Don't have an account? Sign Up"
                      : "Already have an account? Sign In"}
                  </Link>
                </Grid>
              </Grid>
            )}
            <Copyright sx={{ mt: 5 }} />
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}

export default Authentication;
