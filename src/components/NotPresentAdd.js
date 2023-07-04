import React from "react";
import {
  Card,
  Typography,
  CardMedia,
  Avatar,
  CardHeader,
  CardContent,
  Button,
  Box,
  CardActions,
} from "@mui/material";
import me from "../assets/me.jpg";
import styled from "@emotion/styled";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";

const StyledCard = styled((props) => <Card {...props} />)(({ theme }) => ({
  padding: "0.5rem",
  borderRadius: "0.5rem",
  backgroundColor: "#fafafa",
  boxShadow: 5,
  width: "333px",
  height: "220px",
}));

const styledAvatar = {
  height: "10rem",
  width: "8rem",
};

const CandidateCard = ({ onClick }) => {
  return (
    <StyledCard
      elevation={1}
      sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
      component={Button}
      onClick={onClick}
      disableRipple
    >
      <Fab color="primary" disableRipple size="large" aria-label="add">
        <AddIcon />
      </Fab>
    </StyledCard>
  );
};

export default CandidateCard;
