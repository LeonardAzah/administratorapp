import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Avatar,
  Menu,
  MenuItem,
  Typography,
} from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import AuthContext from "../hooks/AuthContext";
import CssBaseline from "@mui/material/CssBaseline";
import LogoutIcon from "@mui/icons-material/Logout";

const Appbar = () => {
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const userDetails = window.localStorage.getItem("user");
  const user = JSON.parse(userDetails);
  const username = user.name;

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  function stringToColor(string) {
    let hash = 0;
    let i;

    /* eslint-disable no-bitwise */
    for (i = 0; i < string.length; i += 1) {
      hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }

    let color = "#";

    for (i = 0; i < 3; i += 1) {
      const value = (hash >> (i * 8)) & 0xff;
      color += `00${value.toString(16)}`.slice(-2);
    }
    /* eslint-enable no-bitwise */

    return color;
  }

  function stringAvatar(name) {
    return {
      sx: {
        bgcolor: stringToColor(name),
      },
      children: `${name.split(" ")[0][0]}${name.split(" ")[1][0]}`,
    };
  }

  return (
    <Box>
      <CssBaseline />

      <AppBar component="nav" sx={{ background: "#fefefe" }} position="fixed">
        <Toolbar>
          <Button
            sx={{
              flexGrow: 1,
              display: "block",
              color: "#01579B",
              fontSize: "18px",
            }}
            href="/home"
          >
            School Voting
          </Button>

          <Menu
            id="demo-positioned-menu"
            aria-labelledby="demo-positioned-button"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            anchorOrigin={{
              vertical: "top",
              horizontal: "left",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "left",
            }}
            sx={{ marginTop: "3rem" }}
          >
            <MenuItem onClick={handleLogout}>
              <LogoutIcon />
              <Typography sx={{ padding: "0.3rem" }}> Logout </Typography>
            </MenuItem>
          </Menu>

          <Box>
            <Button
              sx={{
                color: "#000000",
                fontSize: "16px",
              }}
              href="/home/poll"
            >
              Elections
            </Button>

            <Button
              sx={{
                color: "#000000",
                fontSize: "16px",
              }}
              href="/home/results"
            >
              Results
            </Button>

            <Button
              sx={{ color: "#000000", fontSize: "16px" }}
              href="/home/register"
            >
              Register Student
            </Button>
            <Button>
              {" "}
              <Avatar
                aria-controls={open ? "demo-positioned-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
                onClick={handleClick}
                {...stringAvatar(username)}
              />{" "}
            </Button>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Appbar;
