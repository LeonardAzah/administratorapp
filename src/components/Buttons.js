import React from "react";
import { Button } from "@mui/material";
import { styled } from "@mui/material/styles";

const StyledButton = styled(Button)(({ theme }) => ({
  borderRadius: 10,
  textTransform: "none",
  boxShadow: "none",
  height: 40,
  "& .MuiButton-root": {
    fontSize: "0.9375rem",
  },
}));

const Buttons = ({ ...props }) => {
  return <StyledButton {...props}>{props.btnText}</StyledButton>;
};

export default Buttons;
