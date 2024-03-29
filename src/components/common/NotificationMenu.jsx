import React from "react";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import {
  Badge,
  IconButton,
  Tooltip,
  Typography,
  ListItemIcon,
} from "@mui/material";
import Divider from "@mui/material/Divider";
import { BsBell } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { useUser } from "../utils/userContext";
import requestHandler from "../../apiCalls/requestHandler";
import { USER_ENDPOINTS } from "../../apiCalls/endpoints";

const NotificationMenu = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const navigate = useNavigate();
  const { notifications } = useUser();

  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleNotificationClick = (notification) => {
    try {
      requestHandler(
        "patch",
        USER_ENDPOINTS.UPDATE_NOTIFICATION_STATUS(notification.id),
        { read: true }
      );
    } catch (error) {
        console.log("Failed to update notification");
    }
    navigate("/notifications");
    handleClose();
  };

  const shortenMessage = (message, maxLength) => {
    return message.length > maxLength
      ? message.substring(0, maxLength) + "..."
      : message;
  };
  return (
    <React.Fragment>
      <Tooltip title="Notifications" arrow>
        <IconButton
          onClick={handleClick}
          size="small"
          sx={{ fontSize: "20px", color: "text.primary" }}
          aria-controls={open ? "notification-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
        >
          <Badge
            color="error"
            badgeContent={
              notifications.filter((notification) => !notification.read).length
            }
          >
            <BsBell />
          </Badge>
        </IconButton>
      </Tooltip>

      <Menu
        anchorEl={anchorEl}
        id="notification-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: "visible",
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        {notifications.map((notification) =>
          !notification.read
            ? [
                <MenuItem
                  onClick={() => handleNotificationClick(notification)}
                  key={notification.id}
                >
                  <ListItemIcon>
                    <BsBell />
                  </ListItemIcon>
                  <div style={{ display: "flex", flexDirection: "column" }}>
                    <Typography variant="inherit" color="textSecondary">
                      {notification.subject}
                    </Typography>
                    <Typography variant="body2" color="textPrimary">
                      {shortenMessage(notification.message, 40)}
                    </Typography>
                  </div>
                </MenuItem>,
                <Divider />,
              ]
            : null
        )}
      </Menu>
    </React.Fragment>
  );
};

export default NotificationMenu;
