import { Avatar, Typography, Box } from "@mui/material";
import React from "react";
import BallotOutlinedIcon from "@mui/icons-material/BallotOutlined";

const NotPresent = ({ text }) => {
  return (
    <Box
      sx={{
        display: "flex",
        margin: "10px auto",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <Avatar>
        <BallotOutlinedIcon />
      </Avatar>

      <Typography
        component="h6"
        variant="h6"
        style={{
          display: "flex",
          justifyContent: "center",
          textAlign: "center",
          alignContent: "center",
          fontWeight: "500",
          fontSize: "1.4rem",
        }}
      >
        {text}
      </Typography>
    </Box>
  );
};

export default NotPresent;
