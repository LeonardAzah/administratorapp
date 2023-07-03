import React from "react";
import CircularProgress from "@mui/material/CircularProgress";
import { Box, Typography } from "@mui/material";

function Spinner(props) {
  const { text } = props;
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <CircularProgress
        style={{ width: "20px", height: "20px", size: "0.5rem" }}
      />
      <Typography>{text}</Typography>
    </Box>
  );
}

export default Spinner;
