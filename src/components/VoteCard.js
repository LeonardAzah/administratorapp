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
import Buttons from "./Buttons";
import me from "../assets/me.jpg";
import styled from "@emotion/styled";

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

const VoteCard = ({ name, bio, handleClick }) => {
  return (
    <StyledCard elevation={1}>
      <Box sx={{ display: "flex" }}>
        <Avatar variant="rounded" sx={styledAvatar} alt="photo" src={me} />

        <Box sx={{ padding: "0.1rem" }}>
          <Typography
            variant="h6"
            sx={{ fontWeight: 700, color: "#233862", textAlign: "center" }}
          >
            {name}
          </Typography>

          <Typography variant="body2" sx={{ textAlign: "center" }}>
            {bio}
          </Typography>
        </Box>
      </Box>
      <Buttons
        variant="contained"
        color="primary"
        btnText="Vote"
        sx={{ fontWeight: 700, fontSize: "17px" }}
        onClick={handleClick}
        fullWidth
      />
    </StyledCard>
  );
};

export default VoteCard;
