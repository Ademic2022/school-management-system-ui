import * as React from "react";
import { Routes, Route } from "react-router-dom";
import { Box, CircularProgress } from "@mui/material";
import Sidebar from "./components/common/Sidebar";
import Authentication from "./pages/Authentication";
import Navbar from "./components/common/Navbar";
import {
  SuccessPage,
  ResetLinkSent,
  ActivationComponent,
  NewPassword,
} from "./pages";
import Footer from "./components/common/Footer";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useUser } from "./components/utils/userContext";
import { roleRoutes } from "./components/routing/userRoutes";
import Alerts from "./components/Alerts";
import { notificationMessages } from "./components/utils/notificationMessages";

const sideBarWidth = 250;

const pageLoader = (
  <Box sx={{ display: "flex", justifyContent: "center", py: 8 }}>
    <CircularProgress />
  </Box>
);

function App() {
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const { auth, role, userStatus, isReady } = useUser();

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  const userRoutes = roleRoutes[role] || roleRoutes.Student;
  const msg = notificationMessages(userStatus);
  return (
    <>
      {auth ? (
        <Box sx={{ display: "flex" }}>
          <ToastContainer />
          <Navbar
            sideBarWidth={sideBarWidth}
            handleDrawerToggle={handleDrawerToggle}
          />
          <Sidebar
            sideBarWidth={sideBarWidth}
            mobileOpen={mobileOpen}
            handleDrawerToggle={handleDrawerToggle}
          />
          <Box
            component="main"
            sx={{
              flexGrow: 1,
              px: { xs: 1, md: 2 },
              width: { xs: "100%", md: `calc(100% - ${sideBarWidth}px)` },
            }}
          >
            {msg && isReady && (
              <Alerts
                type={msg.type}
                title={msg.title}
                subtitle={msg.subtitle}
                cancelButton={msg.cancelButton}
              />
            )}
            {/* Routes */}
            <React.Suspense fallback={pageLoader}>
              <Routes>
                {userRoutes.map((route) => (
                  <Route
                    key={route.id}
                    path={route.path}
                    element={route.element}
                  />
                ))}
              </Routes>
            </React.Suspense>
            <Footer />
          </Box>
        </Box>
      ) : (
        <>
          <React.Suspense fallback={pageLoader}>
            <Routes>
              <Route path="/login" element={<Authentication />} />
              <Route
                path="/success"
                element={
                  <SuccessPage
                    color="green"
                    title="Registration Successful"
                    body="We appreciate your registration."
                    message="An email with further instructions has been sent to your email
                    address."
                    buttonText="Go to Login"
                    linkTo="/login"
                  />
                }
              />
              <Route path="/reset_password" element={<ResetLinkSent />} />
              <Route
                path="/activation/:uid/:token/"
                element={<ActivationComponent />}
              ></Route>
              <Route
                path="/reset_password/:uid/:token/"
                element={<NewPassword />}
              ></Route>
            </Routes>
          </React.Suspense>
          <ToastContainer />
        </>
      )}
    </>
  );
}

export default App;
