import { Avatar, Box, Divider, Paper, Typography } from "@mui/material";
import React from "react";
import { FaEllipsisH } from "react-icons/fa";
import { Link } from "react-router-dom";
import { Users } from "../../data/users";

const TopStudents = () => {
  return (
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
        <Typography variant="h5" sx={{ pb: 1 }}>
          Top Students
        </Typography>
        <FaEllipsisH />
      </Box>
      <Divider />
      <Box sx={{ marginTop: 1 }}>
        {Users.slice(0, 2).map(({ id, customer_name, email, img }) => (
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
              <Avatar src={img} sx={{ width: 30, height: 30 }}>{customer_name[0]}</Avatar>
              <Box>
                <Typography variant="h6" sx={{ fontSize: "18px" }}>
                  {customer_name}
                </Typography>
                <Typography variant="subtitle1" sx={{ opacity: 0.7 }}>
                  {email}
                </Typography>
              </Box>
            </Box>
            <FaEllipsisH />
          </Box>
        ))}
      </Box>
      <Divider />
      <Typography variant="subtitle1" sx={{ textAlign: "center", mt: 1 }}>
        <Link to="/students" className="link">
          View more
        </Link>
      </Typography>
    </Paper>
  );
};

export default TopStudents;
