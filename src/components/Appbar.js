import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AppBar, Toolbar } from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import AuthContext from "../hooks/AuthContext";

const Appbar = () => {
  const { logout, userInfo } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <Box>
      <AppBar component="nav" color="transparent">
        <Toolbar>
          <Button
            sx={{
              flexGrow: 1,
              display: { xs: "none", sm: "block" },
              color: "#01579B",
              fontSize: "18px",
            }}
            href="/home"
          >
            School Voting
          </Button>

          <Box>
            <Button
              sx={{ color: "#000000", fontSize: "16px" }}
              href="/home/poll"
            >
              Elections
            </Button>
            <Button
              sx={{ color: "#000000", fontSize: "16px" }}
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
            <Button
              onClick={handleLogout}
              sx={{ color: "#F50312", fontSize: "16px" }}
            >
              Logout
            </Button>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Appbar;
